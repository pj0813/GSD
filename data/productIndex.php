<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    $sql="SELECT * FROM product_index";
    $result=mysqli_query($conn,$sql);
    if($result==false){
        echo '[{"code":-1,"msg":"查询数据失败"}]';
    }else{
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $str=json_encode($row);  
        echo ($str);
    }
?>