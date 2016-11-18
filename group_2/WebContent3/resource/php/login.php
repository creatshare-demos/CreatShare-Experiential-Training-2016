<?php
    //启动session
    session_start();
    //获取登录信息
    $user_id=$_POST['userId'];
    $user_pass=$_POST['userPass'];
    //连接数据库
    include './link.php';
    mysql_select_db("dlxx",$link);
    $Cal=(int)$user_id;
    $Cal=(int)($Cal/10000000);
    //通过判断登录id确定登录身份
    //注册ＩＤ均为８位通过判断首位数字是否为零判断
    //为零是学生，不为零为店家
    //学生均使用学号注册ID，店家分配ID，首字母为１

   if($Cal)
      $table='djxx';
      //选择合适的数据库
      $table='xsxx';
      $find1=mysql_query("select * from $table where id = $user_id");
      if(!mysql_num_rows($find1)){

           //查无此账号
          $value1 = array("isExist"=>false,"type"=>"NO_USER");
          echo json_encode($value1);
      }
      else{
          $re=mysql_fetch_array($find1,MYSQL_NUM);
          if($re[3]==$user_pass)
          {

              //登陆成功
             $value2= array("isExist"=>true,"type"=>"true");
            // $_SESSION['dlid']=$user_id
             echo json_encode($value2);
          }
          else
          {
              //密码错误
             $value3= array("isExist"=>true,"type"=>"ERROR_PASS");
             echo json_encode($value3);
          }
      }


?>
