<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    $sql="SELECT * FROM menu";
    $result=mysqli_query($conn,$sql);
    if($result==false){
        echo '[{"code":-1,"msg":"查询数据失败"}]';
    }else{
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
        foreach($row as $k=>$v){
            $sql="SELECT * FROM submenu WHERE mid=$v[mid]";
            $subresult=mysqli_query($conn,$sql);
            if($subresult==false){
                echo '[{"code":-2,"msg":"查询数据失败"}]';
            }else{
                $subrow=mysqli_fetch_all($subresult,MYSQLI_ASSOC);
                foreach($subrow as $key=>$val){
                    $sql="SELECT * FROM threemenu WHERE subid=$val[subid]";
                    $treeresult=mysqli_query($conn,$sql);
                    if($treeresult==false){
                        echo '[{"code":-3,"msg":"查询数据失败"}]';
                    }else{
                        $treerow=mysqli_fetch_all($treeresult,MYSQLI_ASSOC); 
                        $subrow[$key]['threesub']=$treerow;  
                    }    
                }
                $row[$k]['subnames']=$subrow;
            }    
        }
        $str=json_encode($row);  
        echo ($str); 
    }
?>