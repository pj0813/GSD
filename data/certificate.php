<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$cid=$_REQUEST['cid'];
    @$page=$_REQUEST['page'];
    @$fenpage=$_REQUEST['fenpage'];
    $curpage=$page*$fenpage;
    $sql="SELECT * FROM certificate WHERE cid=$cid LIMIT $curpage,$fenpage";
    $result=mysqli_query($conn,$sql);
    if($result==false){
        echo '{"code":-1,"msg":"查询数据失败"}';
    }else{
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $str=json_encode($row);  
        echo ($str);
    }
?>