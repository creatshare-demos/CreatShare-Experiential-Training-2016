<html>
<head>
<link rel="stylesheet" type="text/css" href="yangshi.css">
<?php
error_reporting(0);
?>
</head>
<body>

<?php
include 'conn.php';
$id=$_GET[id];
$query="SELECT * FROM creatshare WHERE id =".$id;
$result=mysql_query($query);
while ($rs=mysql_fetch_array($result)){
?>
<div id="lg">
<img src="800.jpg">
</div>
<div id="top">
<FORM id="gai" METHOD="POST" ACTION="5.php">
<input type="hidden" name="id" value="<?=$rs['id']?>">
修改用户名：<br /><input type="text" name="name" value="<?=$rs['name']?>"/><br />
修改内容：<br /><textarea form="gai" name="pinglun" rows="4" cols="58"><?=$rs['neirong']?></textarea>
<div id="anni"><input type="submit" name="submit" value="修改" style="background:#9acd32;font-size:15px;color:#f8f8ff";/></div>
</FORM>
</div>
<?php } mysql_close($conn);?>

</body>
</html>