<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$nid=$_REQUEST['nid'];
    $sql="UPDATE news SET seecount=seecount+1 WHERE nid=$nid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
        echo '{"code":-1,"msg":"更新数据失败请注意SQL语句"}';
    }else{
        $count=mysqli_affected_rows($conn);
        if($count==0){
            echo '{"code":-2,"msg":"更新数据失败"}';
        }else{
            echo '{"code":1,"msg":"更新数据成功"}';
        }
        
    }
?>