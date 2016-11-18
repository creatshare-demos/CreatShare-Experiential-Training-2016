<?php 
include('conn.php');
$id = $_GET['id']; 
$query="delete from lyb where id=".$id; 
mysql_query($query); 
?> 
<?php 
header('location: index.php'); 
?> 