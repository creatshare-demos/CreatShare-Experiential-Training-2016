<?php
include 'conn.php';
$id = $_GET['id'];
$query="delete from creatshare where id=".$id;
mysql_query($query); 
?>
<?php
$url = "1.php";
echo "<script language='javascript' type='text/javascript'>";
echo "window.location.href='$url'";
echo "</script>";
?> 