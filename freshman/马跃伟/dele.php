<?php
include './conn.php';
include './html/massage_board.html';

  $sql = "DELETE FROM date WHERE id = $i";
  mysqli_query($conn,$sql);
  

  $url = "read.php";

echo "<script language='javascript' type='text/javascript'>";

echo "window.location.href='$url'";

echo "</script>";
  ?>