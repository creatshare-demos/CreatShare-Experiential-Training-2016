<?php
	error_reporting(E_ALL ^ E_DEPRECATED);
	$i=0;
	$link=mysql_connect("localhost","root","a1245999120");
	mysql_select_db("test",$link);
	$db1="select * from blurb";
	$result1=mysql_query($db1,$link);
	$row1=mysql_num_rows($result1);
	while($i<4){
		$data1=mysql_fetch_array($result1);
		$goodsname=$data1['goodsname'];
		$price=$data1['price'];
		$id=$data1['id'];
		$image="./image/".$id.".jpg";
		echo "<li><div>";
		echo "<img src='$image'>";
		echo "<p>$goodsname</p>";
		echo "<p class='r'>￥$price</p></div></li>";
		$i++;

	}
?>