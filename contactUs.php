<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>苏州市高事达信息科技股份有限公司</title>
    <link rel="shortcut icon" href="img/favicon.ico">

    <link rel="stylesheet" href="css/iconfont.css"/>
    <link rel="stylesheet" href="css/commo.css"/>
    <link rel="stylesheet" href="css/tab.css"/>
    <link rel="stylesheet" href="css/contact.css"/>
    <!--[if lt IE 9]>
    <script src="js/html5shiv.min.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=rF37roE0gfNYTQOWlxxjysqYB80lx2dw"></script>
</head>
<body>
    <header class="header">
    <?php
        include './header.php';
    ?>
    </header>
    <div class="show_banner">
        <img src="img/lxwm.jpg" class="center_img"/>
    </div>
    <section class="content">
        <div>
            <div class="breadcrumb lf">
                <a>
                    <span></span>
                    高事达
                </a>
                <span>

                </span>
            </div>
            <ul class="inline-list sub_nav rf">

            </ul>
        </div>
        <div class="aboutUs">
            <aside class="aboutUs_left">
                <h2>关于我们</h2>
                <ul class="one">

                </ul>
            </aside>
            <div class="companyMap">
                <div>
                    <h3>苏州市高事达信息科技股份有限公司</h3>
                    <p>地址：常熟市古里镇白茆工业区</p>
                    <p>网址：www.gaoshida.com.cn</p>
                    <p>电话：0512-52531161</p>
                    <p>传真：0512-52536788</p>
                    <p>邮箱：gsd@gaoshida.com.cn</p>
                    <div id="gsd"></div>
                </div>
                <div>
                    <h3>苏州工业园区研发中心</h3>
                    <p>地址：苏州园区唯华路3号君地商务广场1号901室</p>
                    <p>网址：www.gaoshida.com.cn</p>
                    <p>电话：0512-62527619</p>
                    <p>传真：0512-62930989</p>
                    <p>邮箱：gsd@gaoshida.com.cn</p>
                    <div id="yfzx"></div>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
    <?php
        include './footer.php';
    ?>
    </footer>
    <script src="js/common.js"></script>
    <script type="text/javascript">
        function setBaiDuMap(map,point,titl,adress){
            map.panTo(point);
            map.centerAndZoom(point,15);
            var marker = new BMap.Marker(point);
            var label=new BMap.Label(titl,{offset:new BMap.Size(20,0)});
            map.addOverlay(marker);
            marker.setLabel(label);
            var opts = {
                width : 200,
                height: 50,
                title : titl ,
                offset:new BMap.Size(-2, -15),

            }
            var infoWindow = new BMap.InfoWindow(adress, opts);  // 创建信息窗口对象
            marker.addEventListener("click", function(){
                map.openInfoWindow(infoWindow,point); //开启信息窗口
            });
            map.enableScrollWheelZoom(true);
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
        }
        var map = new BMap.Map("gsd");
        var point = new BMap.Point(120.890823,31.60059);
        setBaiDuMap(map,point,"苏州市高事达信息科技股份有限公司","地址：常熟市古里镇白茆工业区")
        var map1 = new BMap.Map("yfzx");
        var point1 = new BMap.Point(120.720825,31.367463);
        setBaiDuMap(map1,point1,"苏州工业园区研发中心","地址：苏州园区唯华路3号君地商务广场1号901室")
    </script>
    <script src="js/rem.min.js"></script>
</body>
</html>