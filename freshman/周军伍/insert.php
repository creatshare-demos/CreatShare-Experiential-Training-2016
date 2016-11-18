<?php
	header("location:index.php");
	header('Content-type: text/html;charset=UTF-8');
	if(empty($_POST['username'])){
	echo "请输入你的昵称!";}
	else if(empty($_POST['message'])){
	echo "还是说两句吧!";}
	else{
	$con=mysql_connect("localhost","root","root");
	if(!$con)
	{
	die('Could not connect: ' . mysql_error());
	}
	$time=date("Y-m-d H:i:s");
	mysql_select_db('creatshare');
	mysql_query('set names utf8');
	$sql="INSERT INTO lybdb (username,message,time)
	VALUES
	('".$_POST['username']."','".$_POST['message']."','$time')";
	if(!mysql_query($sql))
	{
	die('Error: ' . mysql_error());
	}
?>
<?php
	if(isset($_POST['submit'])){ 
		include "index.php";
	}
?>
<?
	include "index.php";
	}
	//mysql_close($con);
?>                                    