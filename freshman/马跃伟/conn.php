<?php
header('content-type="text/html; charset=utf-8');
$conn=mysqli_connect("localhost","root","","data"); 
// 检查连接 
if (!$conn) 
{ 
    die("连接错误: " . mysqli_connect_error()); 
} 
?>