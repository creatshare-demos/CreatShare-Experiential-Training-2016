function clickNav() {
  var ul = document.getElementsByTagName("ul")[0];
  var lis = ul.getElementsByTagName("li");
  var div = document.getElementById("main");
  var divs = div.children;


  for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onclick = function () {
      for (var j = 0; j < divs.length; j++) {

        lis[j].className = '';
        divs[j].className = 'hide';
      }

      this.className = "on";
      divs[this.index].className = '';
    }
  }

};



