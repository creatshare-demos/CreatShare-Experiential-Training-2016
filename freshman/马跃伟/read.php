<?php
include'./conn.php';
$sql="SELECT * FROM date"; 
$result=mysqli_query($conn,$sql); 
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
/*$sql = "SELECT * FROM data";
   $query=mysqli_query($sql,$conn)  ;
  $que= mysql_result($query,0);
  $data = mysqli_fetch_all($que,MYSQLI_ASSOC);*/
 
	 /*$find="SELECT * FROM data ";
 $resut=mysqli_query($conn,$find);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);*/
include './html/massage_board.html';
?>