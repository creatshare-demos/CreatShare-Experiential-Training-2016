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

function isEffectiveString(elestring, ele, error, min, max){//判断是否是有效字符串
	if(typeof elestring !== 'string' || typeof ele !== 'object' || typeof error != 'string' || typeof min !== 'number' || typeof max !== 'number'){
		throw new Error("参数类型不匹配！");
	};
	//min和 max是ASCII的范围
	for(var i = 0, len = elestring.length; i < len; i++){
		if(elestring.charCodeAt(i) < min || elestring.charCodeAt(i) > max){
			ele.val(error).css("color", "red").attr("type", "text");
			return false;
		}
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

function setDivHeightCenter(eleStr, parName){//使得指定元素在window下居中
	var parentHeight = $(parName).height();
	var eleHeight = $(eleStr).height();
	var top = Math.floor((parentHeight-eleHeight)/2);

	$(eleStr).css("top", top);
}

function setDivWidthCenter(eleStr){//使得指定元素在window下居中
	var windowWidth = $(window).width();
	var eleWidth = $(eleStr).width();
	var left = Math.floor((windowWidth-eleWidth)/2);

	$(eleStr).css("left", left);
}

function addAjax(arrayList){//添加ajax事件
	if(arrayList == null || typeof arrayList !== 'object' || arrayList.length <= 0){
		throw new Error("类型不匹配！");
	}else{
		$.ajax({
			url:arrayList[0],
			type:arrayList[1],
			data:arrayList[2],
			dataType:"json",
			success:arrayList[3],
			error:function(data){
				alert("失败！" + data)
			}
		});
	}
}
