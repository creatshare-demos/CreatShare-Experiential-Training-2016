<?php

 header('content-type="text/html; charset=utf-8');
$conn=mysqli_connect("localhost","root","","data"); 
// 检查连接 
if (!$conn) 
{ 
    die("连接错误: " . mysqli_connect_error()); 
} 
	if($_POST['submit']){
	 $sql = "INSERT INTO  date ( name, message ,  time) 
VALUES('$_POST[name]','$_POST[message]',now())";

	mysqli_query($conn, $sql);}
	
$url = "read.php";

echo "<script language='javascript' type='text/javascript'>";

echo "window.location.href='$url'";

echo "</script>";
?>
