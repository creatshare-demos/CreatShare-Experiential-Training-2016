<?php
    $localhost='localhost';
    $name1='root';
    $password1='123456';
    $link=mysql_connect($localhost,$name1,$password1);
    if(!$link)
    {
        echo mysql_error();
    }
 ?>
