<?php
$dbname="lybdb";
$conn=mysql_connect("localhost", "root", "luoming258")or die("数据库连接失败");
$db=mysql_select_db($dbname,$conn);
?>