<!DOCTYPE HTML>
<html>
<head>
	<title>留言板</title>	
	<link rel="stylesheet" type="text/css" href="./css/css.css">
<?php
//连接数据库
include('conn.php');
header('content-type="text/html; charset=utf-8'); 
//post提交判定
if($_POST['submit']){
	$sql = "insert into lyb(id,user,content,lastdate) values('','$_POST[username]','$_POST[content]',now())";
	mysql_query($sql);
header('location: index.php');
}
?>

<script type="text/javascript">//js判断post值是否为空
function CheckPost()
{
	if(formthing.username.value=="")
	{
		alert("请输入用户名");
		formthing.username.focus();
		return false;
	}
	if(formthing.content.value=="")
	{
		alert("内容不能为空哦！");
		formthing.content.focus();
		return false;
	}
	return true;
}
</script>
</head>
<body>
	<img class="img1" src="./img/logo.png">
<h1>留言板 <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="http://music.163.com/outchain/player?type=2&id=22668927&auto=1&height=66"></iframe></h1>
<form action="index.php" method="post" name="formthing" onsubmit="return CheckPost()";>
	<span align="center">记录下你的心情吧！</span></br>
	<div class="username">
		用户名:<input type="text" size="10" name="username" /><br/>
	</div>
	<div class="text">
		内容:<textarea name="content" cols="80" rows="10"></textarea><br/>
	</div>
	<div class="btn">
		<input type="submit" name="submit" value="留言" />
	</div>
</form>

<h2>留言内容</h2>
<table width=700 border="0" align="center" cellpadding="5" cellspacing="1" bgcolor="white">  
<?php     
  $sql = "SELECT * FROM lyb order by id desc";  
  $query = mysql_query($sql);  
  while($row = mysql_fetch_array($query)){  
?>  
  <tr bgcolor="yellow">  
  <td><sub><img class=2 height=60 width=60 src="./img/head.jpg"><b><big>   
    用户:<?= $row['user']?></b></sub></td>  
  </tr>  
  <tr bgColor="	pink">  
  <td>内容:<?= ($row['content'])?></br>时间:<?= ($row['lastdate'])?> <a  class="fix"  href="delete.php?id=<?=$row[id]?>">删除</a></td>
  </tr>  
<?php   
  }  
?>  
</table>
</body>  
</html>  