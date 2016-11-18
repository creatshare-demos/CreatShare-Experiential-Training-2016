$(document).ready(function(){
	initCss();//初始化页面的css的一些样式
	addAction();//添加事件

	//TODO 事件处理事件
	function addAction(){//添加事件操作
		inputFocus(".tabContent1 div input");
		inputFocus(".tabContent2 div input[type!=radio]");
		titleClick();
		radioChange();
		checkBtnClick();
		infoBtnClick();
		setDivInfoShow();
	}

	function setDivInfoShow(){//设置提示信息的显示状况
		$(".divTurnSellerPage span").mouseover(function(event){$('.turnTopTip').show().css({"top":event.pageY, "left":event.pageX});})//显示提示框
			.mouseout(function(){$('.turnTopTip').hide();})
			.click(function(){location.href = "./././SellerPage.html";});//跳转到商家列表界面
	}

	function infoBtnClick(){//提示框的确定按钮被点击事件
		$("#btnSure").click(function(){
			$(".divInfo").animate({"opacity":0}, 1000, function(){
				$(this).css("z-index", 0);//放在了回调函数中，因为css总是会先于animate执行
			});
			if($(".divInfo h4").text().substring(0, 0+2) === '恭喜'){//注册成功，可跳转页面
				location.href = "./././SellerPage.html";
			}
		});
	}

	function initCss(){//页面初始化时需要做的页面设计
		$(".titleLogin").css("background", "lightblue");//默认登陆被点击
		$("#studentRadio").prop("checked", true);//设置学生radio默认被选中
		$(".tabContent2").hide();//隐藏注册表
		setDivCenter(".divTable");
	}

	function inputFocus(eleStr){//文本框聚焦时事件处理
		$(eleStr).focus(function(){
			$(this).val("").css("color", "black");
			if(this.id === 'userPass'){
				this.type = 'password';
			}else if(this.id === "user_pass"){
				this.type = 'password';
				$(this).css({"position":"relative", "width":"70%", "float":"right", "right":"10%"});
			}
		});
	}

	function setDivCenter(eleStr){//使得指定元素在window下居中
		var windowHeight = $(window).height()*0.8;
		var eleHeight = $(eleStr).height();
		var top = Math.floor((windowHeight-eleHeight)/2);

		$(eleStr).css("top", top);
	}

	function titleClick(){//点击登陆或者注册时的事件处理
		$(".tabNav ul li").click(function(){
			$(this).css("background", "lightblue").siblings().css("background", "lightgray");
			if(this.id === 'titleLogin'){
				$(".tabContent1").show().next().hide();
			}else{
				$(".tabContent2").show().prev().hide();
			}
		});
	}

	function radioChange(){//按钮发生变化时的事件
		$("#divRadio input").change(function(){
			if(this.id === 'studentRadio'){
				setInputValue({
					"#user_id" : "请输入你的8位学号",
					"#user_name" : "请输入你的姓名",
					"#user_phone" : "请输入你的电话",
					"#user_pass" : "请输入最少6位密码"
				});
				$("#user_id").prop("disabled", false).css("color","lightgray").prev().text("学生学号");
				$("#user_name").prev().text("学生姓名");
			}else{
				setInputValue({
					"#user_id" : "您的账号将在注册后生成，请务必记住！",
					"#user_name" : "请输入商户户名",
					"#user_phone" : "请输入商户电话",
					"#user_pass" : "请输入最少6位密码"
				});
				$("#user_id").prop("disabled", true).css("color", "red").prev().text("商户账号");
				$("#user_name").prev().text("商户户名");
			}
		});
	}

	function setInputValue(obj){//设置指定input默认内容
		if(typeof obj !== 'object'){
			throw new Error("obj不是一个对象！");
		}

		for(var eleName in obj){
			$(eleName).val(obj[eleName]).css("color", "lightgray").attr("type", "text");
		}
	}

	function isNumberString(elestring, ele, error, min, max){//判断是否是有效字符串
		if(typeof elestring !== 'string' || typeof ele !== 'object' || typeof error != 'string' || typeof min !== 'number' || typeof max !== 'number'){
			throw new Error("参数类型不匹配！");
		};
		//密码应该是48~57， 65~90， 97~122
		for(var i = 0, len = elestring.length; i < len; i++){
			if(elestring.charCodeAt(i) < min || elestring.charCodeAt(i) > max){
				ele.val(error).css("color", "red").attr("type", "text");
				return false;
			}
		}
		return true;
	}

	function lengthError(elestring, ele, error, min, max){//长度不匹配则显示错误提示信息
		if(typeof elestring !== 'string' || typeof ele !== 'object' || typeof error !== 'string' || typeof min !== 'number' || typeof max !== 'number'){
			throw new Error("参数类型不匹配！");
		}
		if(min === max && elestring.length !== min){//判断字符串长度是否等于某个值
			ele.val(error).css("color", "red");
			return false;
		}else if(min < max && elestring.length > max || elestring.length < min){//判断字符串长度是否在某个区间之间
			ele.val(error).css("color", "red");
			return false;
		}
		return true;
	}

	function isChineseString(elestring, ele, error){//判断是否是汉字字符串
		if(typeof elestring !== 'string' || typeof ele !== 'object' || typeof error !== 'string'){
			throw new Error("参数类型不匹配！");
		}

		var myReg = /^[\u4e00-\u9fa5]+$/;
	    if (!myReg.test(elestring)){//检测是不是汉字
	    	ele.val(error).css("color", "red");
	    	return false;
	    }
	    return true;
	}

	function checkPassword(ele, error){//检查密码输入
		if(typeof ele !== 'object' || typeof error !== 'string'){
			throw new Error("参数类型不匹配！");
		}

		if(ele.val().trim().length < 6){
			ele.attr("type", "text").val(error).css("color", "red");
			return false;
		}
		return true;
	}

	function checkBtnClick(){//当按钮点击时检查所填内容的正确性
		$("#btnLogin").click(function(){//登陆按钮点击事件
			var userId = $("#userId");
			var userPass = $("#userPass");

			//检查文本输入框的值是否有问题
			var right1 = lengthError(userId.val(), userId, "请输入8位数字！", 8, 8);
			var right2 = checkPassword(userPass, "请输入至少6位密码！");
			var right3 = isNumberString(userId.val(), userId, "请输入8位数字！", 48, 57);
			var right4 = isNumberString(userPass.val(), userPass, "请勿输入非空格、非汉字等非有效密码！", 48, 122);

			if(right1 && right2 && right3 && right4){
				addAjax(["resource/php/login.php", "POST", {"userId":userId.val(), "userPass":userPass.val()}, loginSuccess]);
				/*	返回给我的json需要的内容是：{"isExist":true, "type":"ERROR_PASS"}
				 *  isExist：true表示登陆成功,此时后台需要把用户id写入session中。
				 *  type：NO_USER或者ERROR_PASS, 分别表示 用户不存在 和 密码错误
				*/
			}
		});

		$("#btnRegist").click(function(){//注册按钮点击事件
			var user_id = $("#user_id");
			var user_name = $("#user_name");
			var user_phone = $("#user_phone");
			var user_pass = $("#user_pass");
			var studentRadio = document.getElementById("studentRadio");
			var right1 = true;
			var right2 = true;

			//检查文本输入框的值是否有问题
			if(studentRadio.checked){
				right1 = lengthError(user_id.val(), user_id, "请输入8位数字！", 8, 8);
				right2 = isNumberString(user_id.val(), user_id, "请输入8位数字！", 48, 57);
			}
			var right3 = lengthError(user_phone.val(), user_phone, "请输入11位电话号码！", 11, 11);
			var right4 = lengthError(user_name.val(), user_name, "请输入至少2位至多15位汉字！", 2, 15);
			var right5 = isChineseString(user_name.val(), user_name, "请输入至少2位至多15位汉字！");
			var right6 = checkPassword(user_pass, "请输入至少6位密码！");
			var right7 = isNumberString(user_phone.val(), user_phone, "请输入11位数字！", 48, 57);
			var right8 = isNumberString(user_pass.val(), user_pass, "请勿输入非空格、非汉字等非有效密码！", 48, 122);

			if(right1 && right2 && right3 && right4 && right5 && right6 && right7 && right8){
				addAjax(["resource/php/regist.php", "POST", {"isStudent":studentRadio.checked, "user_id":user_id.val(), "user_name":user_name.val(), "user_phone":user_phone.val(), "user_pass":user_pass.val()}, registSuccess]);
				/*	返回给我的json需要的内容是：{"user_id":"161109"}
				 *  user_id是商户的登陆账号，当我给你发送给的isStudent值为true时表明是学生注册，所以后端只需给前端返回空串即可，
				 *  直接写成{"user_id":""}这样子就好了；
				 * 	当前端给后端发送给的isStudent值为false时表明是商户注册，需要返回商户账号{"user_id":"161109"}
				 *  注册成功后默认是直接登陆了！所以也需要把注册的id写入session
				*/
			}
		});
	}

	function loginSuccess(json){//登陆成功事件
		var jsonObj = eval('json');


		if(jsonObj.isExist && jsonObj.type == 'true'){
			// 还需要判断是否被投诉了！
			/*if(jsonObj.isComplain !== 0){//是否被投诉过
				$(".divInfo").css("z-index", 2).animate({"opacity":1}, 1000).children().eq(1).text("存在黑历史，不可登陆！");
				return;
			}*/
			location.href = "SellerPage.html";
		}else{
			$(".divInfo").css("z-index", 2).animate({"opacity":1}, 1000).children().eq(1).text(jsonObj.type === 'NO_USER' ? "登陆失败！用户不存在！" : "登陆失败！密码不正确！");
		}
	}

	function registSuccess(json){//注册成功事件
		var jsonObj = eval(('json'));
		$(".divInfo").css("z-index", 2).animate({"opacity":1}, 1000).children().eq(1).text(jsonObj["user_id"] ? "恭喜你注册成功 ！您的登陆账号是："+jsonObj["user_id"] : "恭喜你注册成功 ！");
	}

});
