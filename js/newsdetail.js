domReady(function(){
    //页码
    var search = getSearch(location.search);
    var newsid = search.newsid;
    var subsearch="?parentid="+search.parentid+"&typeid="+search.typeid+"&newsid=";
        ajax({
            type: 'GET',
            url: 'data/newsDetail.php',
            data: {nid:newsid},
            success: function (data) {
                if(data.code<0){
                    console.log(data.msg);
                }else{
                var ndate=data[0].newDate.replace(/-/g,'/');
                var newsHTML='<h3>'+data[0].newtitle+'</h3>';
                newsHTML+='<p class="issue">发布时间：<span>'+FormateDate(new Date(ndate))+'</span> 浏览量：<span>'+data[0].seecount+'</span></p>';
                newsHTML+='<div>'+data[0].newsbody+'</div>';
                newsHTML+='<p>时间：<span>'+data[0].newstime+'</span></p>';
                newsHTML+='<p>地点：<span>'+data[0].newsplace+'</span></p>';
                document.querySelector('.news_detail').innerHTML=newsHTML;
                }

            },
            fail: function (data) {
                console.log('程序报错' + data);
            }
        });

    //上一篇
        ajax({
        type: 'GET',
        url: 'data/prevnews.php',
        data: {nid:newsid},
        success: function (data) {
            var newsPrev="";
            if(data.code<0){
                console.log(data.msg);
            }else if(data.length==0){
                newsPrev+="上一篇：无"
            }else{
                newsPrev+="上一篇：<a href='"+subsearch+data[0].nid+"'>"+data[0].newname+"</a>";
            }
            document.querySelector('.page_up').innerHTML=newsPrev;
        },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });
    //下一篇
        ajax({
        type: 'GET',
        url: 'data/nextnews.php',
        data: {nid:newsid},
        success: function (data) {
            var newsNext='';
            if(data.code<0){
                console.log(data.msg);
            }else if(data.length==0){
                newsNext+="下一篇：无"
            }else{
                newsNext+="下一篇：<a href='"+subsearch+data[0].nid+"'>"+data[0].newname+"</a>"
            }
            document.querySelector('.page_down').innerHTML=newsNext;
        },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });
})

window.onunload=function(){
    var search = getSearch(location.search);
    var newsid = search.newsid;
    //浏览次数
    ajax({
        type: 'GET',
        url: 'data/seetimes.php',
        data: {nid:newsid},
        success: function (data) {
            if(data.code<0){
                console.log(data.msg);    
            }else{
                console.log("浏览次数增加");
            }
            
        },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });
}
