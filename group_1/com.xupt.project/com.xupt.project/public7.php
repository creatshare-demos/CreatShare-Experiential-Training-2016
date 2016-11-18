
<?php
error_reporting(E_ALL ^ E_DEPRECATED);
	$link=mysql_connect("localhost","root","a1245999120");
	mysql_select_db("test",$link);
	$db1="select * from blurb";
	$result1=mysql_query($db1,$link);
	$i=$row1=mysql_num_rows($result1);
	$i--;
	while($i>=0){
		$data1=mysql_fetch_array($result1);
		$goodsname=$data1['goodsname'];
		$price=$data1['price'];
		$class=$data1['class'];
		$id=$data1['id'];
		$image="./image/".$id.".jpg";
		if(strcmp($class,'配件')==0){
		echo "<li><div>";
		echo "<img src='$image'>";
		echo "<p>$goodsname</p>";
		echo "<p class='r'>￥$price</p></div></li>";
	}
		$i--;
	}
?>