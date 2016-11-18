//3个jax请求
$(document).ready(function(){
	var jsonArray = [{//传递过来的第一个json是用户姓名，若该用户并没有登陆，则返回空串""即可
		"userName":"李小华"
	},{
		"src" 	   : "./resource/pic/logo1.png",
		"name"     : "蜀香园",
		"introduce": "黄焖鸡拥有多年的历史，是中华美食的代表之一。本店现推出新活动，凡是双十一凡是在本店购买黄焖鸡者，买一送一！且只需支付998！",
		"address"  : "美食广场"
	},{
		"src" 	   : "./resource/pic/logo2.png",
		"name"     : "川味小炒盖浇饭",
		"introduce": "黄焖鸡拥有多年的历史，是中华美食的代表之一。本店现推出新活动，凡是双十一凡是在本店购买黄焖鸡者，买一送一！且只需支付998！",
		"address"  : "美食广场"
	},{
		"src" 	   : "./resource/pic/logo3.png",
		"name"     : "云南傣家米线",
		"introduce": "黄焖鸡拥有多年的历史，是中华美食的代表之一。本店现推出新活动，凡是双十一凡是在本店购买黄焖鸡者，买一送一！且只需支付998！",
		"address"  : "美食广场"
	},{
		"src" 	   : "./resource/pic/logo4.png",
		"name"     : "湖南土菜馆",
		"introduce": "黄焖鸡拥有多年的历史，是中华美食的代表之一。本店现推出新活动，凡是双十一凡是在本店购买黄焖鸡者，买一送一！且只需支付998！",
		"address"  : "美食广场"
	}];
	initSellerList(jsonArray);
	//addAjax(["*.action", "POST", {}, initSellerList]);
	/*
	 * 初始化商家列表，前端不用给后台传输数据，后台返回的数据如上方jsonArray所示。
	 */
	
	initCss();//页面初始化时需要做的页面设计
	addAction();//添加的所有事件
	
	//TODO 事件处理事件
	function initCss(){//页面初始化时需要做的页面设计
		$(".divSearch").children().css("left", $(window).width()*0.4);
		setDivTurnTop();//点击置顶图标时滚动条置顶
	}

	function addAction(){//添加的所有事件
		btnClickTurnPage();
		clickFoodList();
	}

	function addAllFood(arr){
		if(arr === null && typeof arr !== 'object'){
			throw new Error("参数不正确！");
		}
		
		var json;
		var ele = $(".divInfo h4");
		ele.empty();//清空之前加入的已订单信息
		for(var i = 0, len = arr.length; i < len; i++){
			json = eval(('arr[i]'));
			ele.append((i+1) + "." + json.name + ":" + json.cost + "元<br>取餐编号：" + json.number + "<br>请于" + json.time + "前领取！<br><br>");
		}
	}

	function clickFoodList(){
		$("header a").click(function(){
			$(".divInfo").animate({"opacity":1}, 1000);
			/* 方法1：
			 * <% String name = session.getAttribute("name");%>
				<input id="hiddenName" type="hidden" value="<%=name%>" />
				
				var sellerId = $("input[type='hidden']").val();
			 */
			//addAjax(["*.php", "POST", {}, addAllFood]);
			/*
			 * 前台不需要传递数据，后台从session中获取当前登陆用户的账号，然后根据账号查表，来返回一个类似下方的arr的数组回来。
			 */
			var arr = [{
				"name":"黄焖鸡小份",
				"cost":12,
				"number":'012',
				"time":"早上11点"
			},{
				"name":"鸡丝米线",
				"cost":10,
				"number":'008',
				"time":"早上11点"
			},{
				"name":"老干妈炒面",
				"cost":8,
				"number":'003',
				"time":"早上11点"
			}];
			addAllFood(arr);
		});
		$(".divInfo button").unbind('click').click(function(){
			$(".divInfo").animate({"opacity":0}, 1000);
		});
		$('section').click(function(){
			$(".divInfo").animate({"opacity":0}, 1000);
		});
	}

	function setDivTurnTop(){
		$("#turnTop").click(function(){$(window).scrollTop(0);})//置顶
		.hover(function(event){$('.turnTopTip').show().css({"position":"absolute", "top":event.pageY-50, "left":event.pageX-850});})//显示提示框
		.mouseout(function(){$('.turnTopTip').hide();});//隐藏提示框
	}

	function searchAction(sellerArray){//搜索元素的事件处理
		$("#searchInput").click(function(){
			$(this).val("").css("color","black");
			$("#searchInput").keypress(function(event){
				if(event.keyCode == "13"){//回车
					$("#searchBtn").trigger("click");
				}
			});
		});
		$("#searchBtn").unbind("click").bind("click", function(){
			var inputVal = $("#searchInput").val().trim();
			var sectionLen = $("section").children().length;
			
			if(inputVal.length <= 0 || inputVal.length > 20){
				$("#searchInput").val("字长范围为1~20！").css("color","red");
			}else if(sectionLen <= 1){
				alert("亲~没有商家可以选择啊~");
			}else{//开始搜索
				var val = $("#searchInput").val().trim();
				if(val !== '字长范围为1~20！'){//说明输入的是有效关键字
					for(var ele in sellerArray){
						if(sellerArray[ele].indexOf(val) >= 0){
							var top = $(".seller-list-"+ele).offset().top;
							$(window).scrollTop(top);
							$(".seller-list-"+ele).addClass("seller-list-search").siblings().removeClass("seller-list-click");
							return true;
						}
					}
					return false;
				}
				return false;
			}
		});
	}

	function sellerListClick(){//点击商家事件
		$("section").children().not('.divSearch').click(function(){
			var sellerIndex = this.className.split(" ")[0].charAt(12);
			addAjax(["*.action", "POST", {"sellerIndex":sellerIndex}, function(){console.log("选择了第"+(sellerIndex+1)+"个商户~");}]);
			/*
			 * sellerIndex数值表示的是第几个商家(从1开始)，在表中直接查询第“sellerIndex”个商家即可，获取其账号。并保存在session中。不需要返回数据。
			 */
			//TODO 页面跳转应该写在success方法中
			location.href = "././././MenuPage.html";
		});
	}

	function initSellerList(jsonArray){//初始化商家列表
		var json = jsonArray[0];//获取用户姓名
		var jsonObj = eval(('json'));
		var div;
		var sellerArray = {};
		
		$("header span").html(jsonObj["userName"] ? "欢迎"+jsonObj["userName"]+"同学，想要逃离每天排队等饭？快来订餐吧~o(*≧▽≦)ツ" : "欢迎同学，想要逃离每天排队等饭？快来订餐吧~o(*≧▽≦)ツ")
		for(var i = 1, len = jsonArray.length; i < len; i++){
			json = jsonArray[i];
			jsonObj = eval(('json'));
			
			div = "<div class='seller-list-" + i + "'>" +
						"<img alt='error' src='"+ jsonObj["src"] +"'>" +
						"<h4><strong>"+ jsonObj["name"] +"</strong></h4>" +
						"<span>"+ jsonObj["introduce"] +"</span>" +
						"<p>地址："+ jsonObj["address"] +"</p>" +
					  "</div>";
			$("section").append(div);
			sellerArray[""+i] = jsonObj["name"];
			setNewDivStyle($("section").children().last());
		}
		sellerListClick();
		setSearchBtn(sellerArray);
		$('section').css({"height": $(document).height()-$("header").height()});
	}

	//TODO 空格关键字查询
	function setSearchBtn(sellerArray){//搜索按钮点击查询指定商家
		searchAction(sellerArray);
	}

	function setNewDivStyle(newDiv){//设置新生成的商家div的样式
		newDiv.addClass('seller-list-style');
		newDiv.bind("mouseover mouseout", function(){$(this).toggleClass('seller-list-hover');})//鼠标经过div时的样式变化
				.bind("mousedown mouseup", function(){$(this).toggleClass('seller-list-click');});//鼠标点击div时的样式变化
		newDiv.children("img").addClass('seller-list-img')
				.bind("mouseover mouseout", function(){$(this).toggleClass('seller-list-img-hover');});
		newDiv.children("h4").addClass('seller-list-h4');
		newDiv.children("span").addClass('seller-list-span');
		newDiv.children("p").addClass('seller-list-p');
	}

	function btnClickTurnPage(){//点击按钮跳转到注册登陆页面
		$(".btn-default").click(function(){
			location.href = "Login.html";
		});
	}
});