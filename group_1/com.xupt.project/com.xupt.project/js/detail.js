//分类选项卡部分代码
var liArr = document.getElementById('liArr').getElementsByTagName('li');
var ulArr = document.getElementById('ulArr').getElementsByTagName('ul');
for(var i = 0;i < liArr.length;i++){
	//定义一个自定义属性 index
	liArr[i].index = i;
	liArr[i].onclick = function(){
		for(var j = 0;j < liArr.length;j++){
			if(liArr[j].className){
				liArr[j].className = '';
				ulArr[j].className = 'hidden';
			}
		}
		liArr[this.index].className = 'hover';
		ulArr[this.index].className = 'show';
	}
}