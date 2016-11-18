<?php
      //启动session
      session_start();
      $sellerIndex=$_POST['sellerIndex'];//获取前台数据
      include 'link.php';     //连接数据库
      mysql_select_db("sjxx",$link);//选择店家数据库
      //根据前台传进来的序号获取商家名字
      $find2="select * from where ID = $sellerIndex";
      $re=mysql_fetch_array($find,MYSQL_NUM);
      $name_mark=$re[2];
      //再到账号信息存储仓库中获取商家账号并保存在session中
      mysql_select_db("dlxx",$link);
      $find3="select * from where name=$name_mark";
      $re2=mysql_fetch_array($find,MYSQL_NUM);
      $getid=$re2[0];
      $_SESSION['djid']=$getid;

 ?>
