//6个ajax请求
$(document).ready(function(){
	initActions();//页面初始化的数据加载
	addActions();//所有的事件编写

	//TODO 事件处理事件
	function addActions(){//所有的事件编写
		setDivInfo();//设置弹出框事件
		btnClick();//按钮点击事件
		setDivTipShow();//设置返回上一页的提示信息
		clickA();//点击头部a标签事件
	}

	function clickA(){//点击头部的a标签事件
		$('header a').click(function(){
			$(".divInfo").css("z-index", 1).animate({"opacity":1}, 1000);
			var input = '菜名：<input type="text" value="请输入菜名" style="height:30px;color:gray;"><br>' +
				'价钱：<input type="text" value="请输入价钱(eg:14.5)" style="height:30px;color:gray;"><br>';
			$(".divInfo h4").text("").append(input);
			$(".divInfo h4 input").click(function(){$(this).val("").css("color", "black");});
		});
	}

	function setDivInfo(){//设置弹出框样式和按钮点击事件
		setDivHeightCenter(".divInfo", window);
		setDivWidthCenter(".divInfo");
		$("#btnToSure").click(function(){
			var h4 = $(this).prev();
			if(h4.text().indexOf("菜名") === 0){//添加菜单状态
				var name = h4.find('input').eq(0);
				var cost = h4.find('input').eq(1);
				if(isChineseString(name.val(), name, "请输入汉字！") && isEffectiveString(cost.val(), cost, "请输入数字！(eg:12.5)", 46, 57)){
					//TODO
//					addAjax(["*.php", "POST", {"name":name, "cost":cost}, function(json){
//						var id = eval(('json')).id;
//						initMenuList([{
//							"id"  :id,
//							"name":name.val(),
//							"cost":cost.val()
//						}]);
//						$(".divInfo h4").text("添加成功！");
//					}]);
					/*
					 * name是菜名， cost是价钱。后台需要从session中获取到当前账号，即商家id，然后在表中添加一行信息，且自动生成的3位菜名编号需要
					 * 返回给前端。返回形式类似于{"id", "012"}
					 */
				}
			}else{//投诉状态
				$(".divInfo").css("z-index", -1).animate({"opacity":0}, 1000);
			}
		});
	}

	function btnClick(){//按钮点击事件
		$("#selectAll").click(function(){//全选按钮
			setAllSelectBtn(".foodList tbody");
		});
		$("#selectRemove").click(function(){//已取走按钮
			var checked = getAllSelected(".foodList table tbody");
			var j = 0;
			var number = [];
			for(var i = 0, len = checked.length; i < len; i++){
				checked[i].parent().parent().remove();
				number[j++] = checked[i].parent().parent().children().eq(3).text();
			}
			//addAjax(["*.php", "POST", {"numberArray", number}, function(){}]);
			/*
			 * numberArray的值是一个数组['001', '002', '003']之类的形式，里面的值是string类型的。
			 * 后台获取到编号，然后从表中删除该商家编号为001,002,003的订单信息。（删除表中的信息不知道妥当否？）
			 * 后台不用给前端返回数据。
			 */
		});
		$("#selectComplain").click(function(){//投诉按钮
			var checked = getAllSelected(".foodList table tbody");
			var studentId = [];
			for(var i = 0, len = checked.length; i < len; i++){
				studentId[i] = checked[i].next().text();//获取学生的账号
				checked[i].parent().parent().remove();
				$(".divInfo").css("z-index", 1).animate({"opacity":1}, 1000);
				$(".divInfo h4").text("投诉成功！");
			}
			//TODO
			//addAjax(["*.php", "POST", {"studentId", studentId}, function(){}]);
			/*
			 * studentId是被投诉的学生的账号，被投诉的原因就是没有按时间取餐。以后禁止订餐！无需返回数据。
			 */
		});

		$("#selectAllSell").click(function(){//售罄按钮
			var checked = getAllSelected(".foodList table tbody");
			//TODO 有时间可以完成这个功能
		});
		$("#selectAllSelected").click(function(){//全选按钮
			setAllSelectBtn(".menuList tbody");
		});
		$("#selectCancel").click(function(){//删除按钮
			var checked = getAllSelected(".menuList tbody");
			var foodNumbers = [];
			for(var i = 0, len = checked.length; i < len; i++){
				foodNumbers[i] = checked[i].parent().prev().text();//获取要删除的菜的编号
				checked[i].parent().parent().remove();
			}

			//TODO
//			addAjax(["*.php", "POST", {"foodNumbers":foodNumbers}, function(){
//				for(var i = 0, len = checked.length; i < len; i++){//移除表中数据
//					checked[i].parent().parent().remove();
//				}
//			}]);
			/*
			 * 前端给后台传递的是需要删除的菜单的编号，后台根据编号删除该菜的信息。不需要返回数据。
			 */
		});
	}

	function setAllSelectBtn(str){//设置全选/全不选按钮
		var inputs = $(str +" input[type='checkbox']");//字符串input前的空格不可以去掉！
		var ifAllSelectedIndex = 0;
		for(var i = 0, len = inputs.length; i < len; i++){
			if($(inputs[i]).prop("checked") === true){
				ifAllSelectedIndex++;
			}
		}
		inputs.prop("checked", (i === ifAllSelectedIndex ? false : true));
		//如果判断出的结果是当前checkbox全被被选中过了，则所有checkbox设置为不选中
	}

	function getAllSelected(str){//获取到所有复选框被选中的行元素
		var checkboxs = $(str + " input[type='checkbox']");
		var j = 0;
		var check = [];
		for(var i = 0, len = checkboxs.length; i < len; i++){
			if($(checkboxs[i]).is(':checked')){
				check[j++] = $(checkboxs[i]);
			}
		}

		return check;
	}

	function initActions(){//初始化页面数据的所有操作
		var array = [{
			"id":"001",
			"name":"黄焖鸡米饭小份",
			"cost":12
		},{
			"id":"002",
			"name":"鸡丝米线",
			"cost":6
		},{
			"id":"003",
			"name":"老干妈炒饭",
			"cost":6.5
		}];
		initMenuList(array);
		//addAjax(["*.php", "POST", {}, initMenuList]);
		/*
		 * 后台从session获取当前登陆用户的账号，即商家账号。然后查表获取所有菜单。返回给前台的数据如上面array一样。
		 */

		var arr = [{
			"id":"05149092",
			"foodName":["鸡丝米线", "牛肉米线", "过桥米线"],
			"cost":12,
			"ifTakeOut":true,
			"number":'000',
			"taste":"不要辣椒"
		},{
			"id":"05149094",
			"foodName":["鸡丝米线"],
			"cost":12,
			"ifTakeOut":true,
			"number":'001',
			"taste":"不要辣椒"
		},{
			"id":"05149093",
			"foodName":["鸡丝米线"],
			"cost":12,
			"ifTakeOut":false,
			"number":'002',
			"taste":""
		}];
		initFoodList(arr);
		//addAjax(["*.php", "POST", {}, initMenuList]);
		/*
		 * 后台从session获取当前登陆用户的账号，即商家账号。然后查表获取所有订单。返回给前台的数据如上面arr一样。
		 */
	}

	function initFoodList(arr){//初始化订餐表格
		if(arr === null || typeof arr !== 'object'){
			throw new Error("参数不正确！");
		}

		var foodList = $(".foodList>table>tbody");
		var json = null;
		var tr = "";
		var foodNameString = "";
		var startIndex = foodList.find('tr').length;//需要设置i的初值的原因是以后再添加元素的时候不会发生input的id重名！
		for(var i = startIndex, len = arr.length; i < len; i++){
			json = eval(('arr[i]'));
			foodNameString = json["foodName"].join("、");
			tr = "<tr class='normalFont'><td><input type='checkbox' id='checkbox-"+ i +"'/><label for='checkbox-"+ i +"'>"+ json.id +"</label>" +
					"</td><td>"+ foodNameString +"</td><td>"+ json.cost +"</td><td>"+ (json.ifTakeOut ? "是":"否") +"</td>" +
					"<td>"+ json.number +"</td><td>"+ json.taste +"</td></tr>";
			foodList.append(tr);
		}
		setTrClickChecked(foodList);
	}

	function initMenuList(array){//初始化菜单表格
		if(array === null || typeof array !== 'object'){
			throw new Error("参数不正确！");
		}

		var menuList = $(".menuList>table>tbody");
		var json = null;
		var tr = "";
		for(var i = 0, len = array.length; i < len; i++){
			json = eval(('array[i]'));
			tr = "<tr class='normalFont'><td>" + json["id"] + "</td><td><input type='checkbox'"
				+" style='box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .6);float:left;'/>"
				+ json["name"] + "</td><td>" + json["cost"] + "</td></tr>";
			menuList.append(tr);
		}
		setTrClickChecked(menuList);
	}

	function setTrClickChecked(tableEle){//点击行时复选框被选中/不选中
		tableEle.find('tr').click(function(){
			var isChecked = $(this).find("input").prop("checked");
			$(this).find("input").prop("checked", isChecked ? false : true);
		});
	}

	function setDivTipShow(){//设置提示信息的显示状况
		$(".divTurnSellerPage span").mouseover(function(event){$('.turnTopTip').show().css({"top":event.pageY, "left":event.pageX});})//显示提示框
			.mouseout(function(){$('.turnTopTip').hide();})
			.click(function(){location.href = "./././Login.html";});//跳转到商家列表界面
	}
});
