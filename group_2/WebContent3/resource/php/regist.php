<?php
    session_start();
    /*处理ＰＯＳＴ过来的json并获取
    首先按判断布尔型的isStudent的值,为１为学生获取ID,不为１为店家分配ID*/
    $isStudent=$_POST['isStudent'];
    if($_POST['isStudent']=='true')
        $isStudent=1;
    if($_POST['isStudent']=='false')
        $isStudent=0;
    //此处为json数据处理；
   if($isStudent)//学生注册
    {
        $id = $_POST['user_id'];
        $password =$_POST['user_pass'];
        $name =$_POST['user_name'];
        $phone =$_POST['user_phone'];
        include'./link.php';
        mysql_select_db("dlxx",$link);
        $insert ="insert into xsxx values ('$id','$name','$phone','$password','')";
        if(mysql_query($insert)) {
        //注册成功
        //返回json数据（ＩＤ）
          $value = array("user_id"=>"");
          //$_SESSION['dlid']=$user_id;　　　//将已成功账号存入session
          echo json_encode($value);
        }
    }
    else{//商家注册
      //分配ＩＤ
      include'./link.php';
      mysql_select_db("dlxx",$link);
      $time=time();
      $id=(int)(date("ymd",$time));
      $find=mysql_query("select * from djxx");
      $num=mysql_num_rows($find);
      $id=$id*100+$num;
      $id=(string)$id;
      //获取json数据
      $password =$_POST['user_pass'];
    	$phone =$_POST['user_phone'];
      $name =$_POST['user_name'];
      $insert ="insert into djxx values ('$id' ,'$name','$phone','$password')";
      if(mysql_query($insert)) {
          //注册成功
          //返回json数据(ID)
          $value = array("user_id"=>"$id");
        //  $_SESSION['dlid']=$user_id;  //将已成功账号存入session
          echo json_encode($value);
      }
    }

?>
