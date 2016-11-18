//2个ajax请求
$(document).ready(function(){
	setSomeCss();//设置一些页面初始化的css
	var jsonArr = [{"sellerName":"杨铭宇de黄焖鸡米饭"},
	            {"src":"././resource/pic/111.png", "name":"黄焖鸡米饭小份", "cost":10.00},//TODO 还有src
	            {"src":"././resource/pic/111.png", "name":"黄焖鸡米饭中份", "cost":12.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖鸡米饭大份", "cost":14.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖排骨小份", "cost":12.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖排骨中份", "cost":14.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖排骨大份", "cost":16.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖千页豆腐小份", "cost":8.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖千页豆腐中份", "cost":10.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖排骨中份", "cost":14.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖排骨大份", "cost":16.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖千页豆腐小份", "cost":8.00},
	            {"src":"././resource/pic/111.png", "name":"黄焖千页豆腐中份", "cost":10.00}];
	initMenuList(jsonArr);
	//addAjax(["*.php", "POST", {}, initMenuList]);
	/* 初始化所有的菜单。
	 * 后台从session获取商家账号，然后查相关的表获取商家的名字和所有菜单，返回的数据类型如上jsonArr所示。
	 */

	doActions();//所有事件处理

	function doActions(){//所有事件处理
		calculateCost();
		getFootNumber();
		divInfoBtnAction();
	}

	function divInfoBtnAction(){
		$("#btnToSure").click(function(){
			$(".divInfo").css("z-index", -1).animate({"opacity":0}, 1000);
			var text = $(this).prev().text();
			if(text !== '请选择菜单！' && text !== '请先登陆才能选择菜单！'){//说明已经下单
				location.href = "./././SellerPage.html";
			}
		});
	}

	function getFootNumber(){
		$("#btnSure").click(function(){
			var cost = $("#totalCost").html();
			var time = $("#inputTime").val();
			var ifTakeOut = $("#yes").prop("checked");
			var taste = $("#inputTaste").val();
			if(cost === '0'){
				$(".divInfo").css("z-index", 1).animate({"opacity":1}, 1000).find('h4').text("请选择菜单！");
			}else if(time === ''){
				$("#inputTime").val("请输入取餐时间！").css("color","red");;
			}else{
				//TODO ajax
				var checkboxs = $(".divMenu input[type='checkbox']");
				var number = [];
				var index = 0;
				for(var i = 0, len = checkboxs.length; i < len; i++){//获取所有选择的菜单的序号（从1 开始）
					if($(checkboxs[i]).is(':checked')){
						number[index++] = $(checkboxs).index(checkboxs[i]);
					}
				}
//				addAjax(["*.php", "POST", {"cost":cost, "ifTakeOut":ifTakeOut, "time":time, "taste":taste, "numberArray":number}, function(json){
//					var jsonObj = eval(('json'));
//					$(".divInfo").css("z-index", 1).animate({"opacity":1}, 1000).find('h4').text("你的取餐编号是：" + jsonObj.number);
//				}]);
				/*
				 * 传递给后台的数据：cost价钱，ifTakeOut是否外带（true为外带），time为取餐时间，  taste为忌口， numberArray为当年登陆用户选择的菜的下标，比如说某学生选择了
				 * 第二道和第五道菜，那么我给你传递的数组是[1, 4],值是number类型的，然后后台查店家的菜单表，获取第二条和第五条的表信息（
				 * 返回的数据应该是{"number":002}，是3位订餐号
				 */
			}
		});
	}

	function calculateCost(){//计算总价钱
		$(".col-md-4 input").change(function(){
			var value = parseInt($(this).parent().next().text().substring(2));
			var finalCost = parseInt($("#totalCost").text());

			$("#totalCost").text(this.checked ? (value + finalCost) : (finalCost - value));
		});
	}

	function initMenuList(jsonArr){
		if(typeof jsonArr !== 'object'){
			throw new Error("参数必须是数组，且每个元素必须是对象！");
		}

		var json = eval(('jsonArr[0]'));
		var div;
		$("header label").text("欢迎光临 " + json.sellerName);
		for(var i = 1, len = jsonArr.length; i < len; i++){
			json = eval(('jsonArr[i]'));
			var div = "<div class='col-md-4'>" +
						"<label for='menu-"+ i +"' class='divLabel'><img alt='error' src='" + json["src"] +"'></label>" +
						"<div class='divMenu'><input type='checkbox' disabled='disabled' class='checkInput' id='menu-"+ i +"' /><label for='menu-"+ i +"'>"+ json["name"] +"</label></div>" +
						"<div class='divPrice'>$ "+ json["cost"] +"</div>" +
					   "</div>";
			$(".foodInfo").before(div);
		}

		//TODO 判断session中存在用户id吗
		var hasLogined = false;
		if(hasLogined){//登陆用户可以选择菜单
			$("section div input[type='checkbox']").removeAttr("disabled");
		}else{//游客不能选择菜单
			$(".col-md-4 label").click(function(){//游客试图点击菜单图片或者菜名时的事件
				$(".divInfo").css("z-index", 1).animate({"opacity":1}, 1000).find('h4').text("请先登陆才能选择菜单！");
			});
		}
	}

	function setDivInfoShow(){//设置提示信息的显示状况
		$(".divTurnSellerPage span").mouseover(function(event){$('.turnTopTip').show().css({"top":event.pageY, "left":event.pageX});})//显示提示框
			.mouseout(function(){$('.turnTopTip').hide();})
			.click(function(){location.href = "./././SellerPage.html";});//跳转到商家列表界面
	}

	function setSomeCss(){//设置一些页面初始化的css
		$(".divTurnSellerPage span").css("height", $('header').css("height"));
		setDivInfoShow();
		setDivHeightCenter(".divInfo", window);
		setDivWidthCenter(".divInfo");
		$(".foodInfo input[type='text']").click(function(){$(this).val("").css("color", "black");});
	}
});
