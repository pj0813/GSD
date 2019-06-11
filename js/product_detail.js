domReady(function(){
    var search = getSearch(location.search);
    var pdttype = search.pdtid;
    ajax({
        type: 'GET',
        url: 'data/pdtDeatil.php',
        data:{cid:pdttype},
        dataType:'HTML',
        success: function (data) {
            if(data.code<0){
                console.log(data.msg);
            }else{
                document.querySelector('.product_detail').innerHTML=data;
            }
            },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });

})
