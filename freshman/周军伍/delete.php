<?php
	header("location:index.php");
	header('Content-type: text/html;charset=UTF-8');
	$con=mysql_connect("localhost","root","root");
	if(!$con)
	{
	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('creatshare');
	mysql_query('set names utf8');
	$id=$_GET['id'];
	
	//$sql="delete from lybdb where id='$id'";
	//if(mysql_query($sql))
	
	$result = mysql_query("delete from lybdb where id='$id'");
	if($result){
	;
	}
	else{
	echo "删除失败";
	}

?>