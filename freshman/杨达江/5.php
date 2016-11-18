<head>
<?php
error_reporting(0);
?>
</head>
<?php
include 'conn.php';
if(($_POST['name'])&&($_POST['pinglun'])!="")
{
    $query="update creatshare set name='$_POST[name]',neirong='$_POST[pinglun]' where id='$_POST[id]'";
    mysql_query($query);
	$url = "1.php";
    echo "<script language='javascript' type='text/javascript'>";
    echo "window.location.href='$url'";
    echo "</script>";
}
else
{
	echo "<script language='javascript' type='text/javascript'>";
    echo "alert('请填写用户名和内容')";
    echo "</script>";
	$url = "3.php?id=".$_POST['id'];
    echo "<script language='javascript' type='text/javascript'>";
    echo "window.location.href='$url'";
    echo "</script>";
}
?>
<?php
mysql_close($conn);
?> 