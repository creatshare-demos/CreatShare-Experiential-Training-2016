<?php
    session_start();
    include 'link.php';
    mysql_select_db('dlxx',$link);
    if((int)$_SESSION['dlid'])
    {
        $id1=$_SESSION['dlid'];
        $find2=mysql_query("select * from xsxx where id = $id1");
        $re2=mysql_fetch_array($find2,MYSQL_NUM);
        $json_loginsj1=$re2[2];
    }
    else
        $json_loginsj1="";
    //
    mysql_select_db('sjxx',$link);
    $time_xh=mysql_num_rows(mysql_query(select * from djxx1));
    $array1[0]=$json_loginsj1;
    for($i=1;$i<$time_xh+1;$i++){
         $part_array=mysql_fetch_array(mysql_query("select * from djxx1 where ID=$i"),MYSQL_ASSOC);
         $array1[$i]= json_encode($part_array);
    }
    echo  json_encode($array1)
 ?>
