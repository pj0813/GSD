domReady(function(){
    var search = getSearch(location.search);
    var pdttype = search.typeid;
    getPdt(pdttype,0,12);
    var urlsql='SELECT count(*) as pages FROM pdt_detail WHERE pid='+pdttype;
    ajax({
        type: 'GET',
        url: 'data/pages.php',
        data:{sql:urlsql},
        success: function (data) {
            var count = data[0].pages;
            showpage(count,1,12);
            var select = document.querySelector('.select_page select');
            EventUtil.addHandler(select,'change', function () {
                getPdt(pdttype, select.value-1,12);
            })
        },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });
    //产品显示
    function getPdt(type, curpage,fenys) {
        ajax({
            type: 'GET',
            url: 'data/getproduct.php',
            data: {cid: type, page: curpage,fenpage:fenys},
            success: function (data) {
                var chtml='';
                if(data.code<0){
                    console.log(data.msg);
                }else if(data.length===0){
                    chtml='';
                }else{
                         chtml = "<ul class='inline-list honorlist'>";
                    for (var i = 0; i < data.length; i++) {
                        chtml += "<li><a href='./product_detail.php"+location.search+"&pdtid="+data[i].did+"'><div><img src='img/" + data[i].pic + "'></div><p>" + data[i].dname + "</p></a></li>"
                    }
                    chtml += "</ul>";

                }
                document.querySelector('.product_list>div').innerHTML = chtml;


            },
            fail: function (data) {
                console.log('程序报错' + data);
            }
        });
    }
})
