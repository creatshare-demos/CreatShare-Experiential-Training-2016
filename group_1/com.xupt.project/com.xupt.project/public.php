<?php
	error_reporting(E_ALL ^ E_DEPRECATED);
	$link=mysql_connect("localhost","root","a1245999120");
	mysql_select_db("test",$link);
	$name=$_POST['name'];
	$describe=$_POST['describe'];
	$price=$_POST['price'];
	$class=$_POST['class'];
	echo "$name";
	$wechat=$_POST['wechat'];
	mysql_query("set names utf8",$link);
	$upload_dir="./image/";
	$upload_name=$upload_dir.iconv("utf-8", "gb2312", $_FILES['img']['name']);
	move_uploaded_file($_FILES['img']['tmp_name'], $upload_name);	
	$db1="INSERT INTO blurb(goodsname,describes,price,class,wechat) VALUES('$name','$describe',$price,'$class','$wechat')";
	mysql_query($db1,$link);
	$db2="select id from blurb where wechat='$wechat'";
	$result=mysql_query($db2,$link);
	$data=mysql_fetch_assoc($result);
	$a=$data['id'];
	$a="./image/".$a.".jpg";
	rename($upload_name, $a);
	
	
?>