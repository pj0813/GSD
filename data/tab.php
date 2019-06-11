<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$subid=$_REQUEST['subid'];
	@$id=$_REQUEST['id'] or die('{"code":-2,"msg":"二级分类id不能为空"}');
    if($subid==0){
        $sql="SELECT * FROM submenu WHERE subid=$id";
    }else{
        $sql="SELECT * FROM threemenu WHERE cid=$subid AND subid=$id";
    }
    $result=mysqli_query($conn,$sql);
    if($result==false){
        echo '{"code":-1,"msg":"查询数据失败"}';
    }else{
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $str=json_encode($row);  
        echo ($str);
    }
?>