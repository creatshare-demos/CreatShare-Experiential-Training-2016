<html>

<head>
	<title>CREATSHARE留言板</title>
	<style type="text/css">
	#p1{text-align:left;}
	#p2{text-align:center;}
	#p3{text-align:right;}
	
	#p4{font-size:24px;}
	
	.box1{
		width:800px;
		margin:0 auto;
		}
	
	.div1{background-color:#F3DE3F;}
	.div_img1{text-align:left;}
	.div_img2{text-align:center;}
	.div_img3{text-align:right;}
	.c1{color: #00FFFF;}


	</style>

</head>

<bady>

	<div class="div_img2"><img src="./photos/creatshare.png" width="600 height="300"></div>	
	<div class="div1" ><h1 id="p2" class="c1" >留	 言		板<h1></div>	
	</br>
	
	<div  id="p4" class="box1" >
	<img src="./photos/hanwudadi.jpg" width="35" height="35" >
	
	<h2 id="p2" >You can you say!</h2>
	<hr/>
	
	</br>
	<form action="insert.php" method="post" />
	</label >昵称：</label>
	<input type="text" name="username" style="width:150px;height:28px;border-color:red" placeholder="昵称" />	
	</br>
	</br>
	<textarea type="text" id="p4" name="message"  style="width:800px;resize:none;border-color:red" rows = "3"  placeholder="在这里添加留言内容"/></textarea>
	</br>
	
	<p id="p3" >
	<input type="reset" style="width:px;border-color:blue" />
	<input type="submit" style="width:px;border-color:blue" value="发表留言" />
	</p>
	
	</form>
	

	<?php
	header('Content-type: text/html;charset=UTF-8');
	$con = mysql_connect("localhost","root","root");
	if (!$con)
	{
		die("数据库服务器连接失败");
	} 
	mysql_select_db("creatshare");
	mysql_query("set names utf8");
	$sql = "select * from lybdb";
	$result = mysql_query($sql,$con) or die("SQL有误");
	$i=0;
	while($row=mysql_fetch_array($result))
	{
		$name = $row['username']; 
		$message = $row['message'];
		$time = $row['time'];
?>	
	<hr/>
<?	
	$i++;
	echo $i,"楼：";	
?>
	<img src="./photos/head.jpg" width="30" height="30">
	<tr><?php echo $name; ?> </tr>
	</br>	
	<p style="text-indent:2em"> <td> <?php echo $message; ?></td> </p>
	
	<p id="p3">
	<td> <?php echo $time; ?> </td>
<?
	echo '<a href="delete.php?id='.$row['id'].'">删除</a>'
?>
	</p>
<?	
	}
	mysql_close($con);	
?>
	
	</div> 



</bady>

</html>
