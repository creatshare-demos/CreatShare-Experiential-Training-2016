<?php
    session_start();
    $djid=$_SESSION['djid'];
    include 'link.php';
    mysql_select_db('dlxx',$link);
    $find3=mysql_query("select * from djxx where id = $djid");
    $re3=mysql_fetch_array($find3,MYSQL_NUM);
    $array[0]=$re3;
    mysql_select_db('sjxx',$link);
    $time_cp=mysql_num_rows(mysql_query("select * from cpxx1"));
    for($j=1;$j<time_cp;$j++){
      $partof_array=mysql_fetch_array(mysql_query("select * from cpxx1 where ID_cp=$j"),MYSQL_ASSOC);
      $array1[$i]= json_encode($partof_array);
    }
    echo json_encode($array1);
?>
