<?php
    header('Content-type:text/html;charset=utf-8');
    require('init.php');
    @$cid=$_REQUEST['cid'];
    $sql="SELECT texturl FROM pdt_detail WHERE did=$cid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
        echo "未查到相应的详情页面";
    }else{
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $file_path ="../".$row[0]['texturl'];
        if(file_exists($file_path)){
            $fp = fopen($file_path,"r");
            $str = fread($fp,filesize($file_path));//指定读取大小，这里把整个文件内容读取出来
            fclose($fp);
            echo $str;
        }else{
            echo "文件不存在";
        }
    }
?>