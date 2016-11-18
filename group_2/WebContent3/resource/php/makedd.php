<?php
      //获取前台传送过来的数据
      $cost=$_POST['cost'];
      $ifTakeOut=$_POST['ifTakeOut'];
      $time1=$_POST['time'];
      $taste=$_POST['taste'];
      $numberArray=$_POST['numberArray'];
      include './link.php';
      mysql_select_db("sjxx",$link);
      mysql_query("insert into ddxx values ('$numb','$cost','$ifTakeOut','$taste','$time1')");
      $xh=mysql_num_rows(mysql_query(selcet * from ddxx));
      $values1=array("number"=>"$xh+100");
      echp json_encode($values1);

 ?>
