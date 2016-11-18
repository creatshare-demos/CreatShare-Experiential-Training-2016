<html>
<head>
<link rel="stylesheet" type="text/css" href="yangshi.css">
<?php
error_reporting(0);
?>
</head>
<body>
<div id="lg">
<img src="800.jpg">
</div>
<div id="zhuti">
 <img src="q.jpg" width="82" height="82" />
 <div id="pinglun"><textarea  form="liuyanban" name="pinglun" cols="61" rows="4"></textarea></div>
 <form action="1.php" method="post" id="liuyanban" >
 <div id="mingzi"><input type="text" name="mingzi" style="width:72px;font-size:12px;" maxlength="5"></div>
 <div id="anniu"><input type="submit" value="提交评论" name="submit" style="background:#9acd32;font-size:15px;color:#f8f8ff";></div>
 </form>	
</div> 
<div id="lishi"> 
<?php
  include ("conn.php");
  if($_POST['submit'])
  {
       if(($_POST['mingzi'])&&($_POST['pinglun'])!="")
     {
	  $sql = $sql="INSERT INTO creatshare (id,name,neirong,time) VALUES (NULL,'$_POST[mingzi]','$_POST[pinglun]',now())"; 
      mysql_query($sql);
     }
       else 
     {
	  echo "<script language='javascript' type='text/javascript'>";
      echo "alert('请填写用户名和内容')";
      echo "</script>";
     }
  }  
  $sq = "select * from creatshare";
  $result = mysql_query($sq); 
  while($row = mysql_fetch_array($result)){
?>
 <div id="zong">
 <div id="zuolan"><img src="q.jpg" width="82" height="82" /></div>
 <div id="dinglan"><span class="用户名"><?php print_r($row["name"]);echo "<hr style='border:0px'/>";echo "<hr style='border:0px'/>";?></span><span class="内容"><?php  print_r($row["neirong"]);?></span></div>
 <div id="xialan"><span class="时间"><?php print_r($row["time"]);?><span class="空格">===</span><a href="2.php?id=<?=$row['id']?>" style="color:#2F4F4F">删除</a>|<a href="3.php?id=<?=$row['id']?>" style="color:#2F4F4F">修改</a></span><hr style='border:1px dashed #d0d0d0'/></div>
 </div>
 <?php }
  mysql_close($conn);
 ?>
</div>