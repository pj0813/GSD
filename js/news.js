domReady(function(){
    //页码
    var search = getSearch(location.search);
    var zstype = search.typeid;
    var urlsql='SELECT count(*) as pages FROM news WHERE sid='+zstype;
    ajax({
        type: 'GET',
        url: 'data/pages.php',
        data:{sql:urlsql},
        success: function (data) {
            if(data.code<0){
                console.log(data.msg)
            }else{
                var count = data[0].pages;
                showpage(count,1,2);
                var select = document.querySelector('.select_page select');
                EventUtil.addHandler(select,'change', function () {
                    getNews(zstype,select.value-1,2);
                })    
            }
            
        },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });
    //新闻内容
    getNews(zstype,0,2);
    function getNews(type, curpage,fenys) {
        ajax({
            type: 'GET',
            url: 'data/getnews.php',
            data: {sid: type, page: curpage,fenpage:fenys},
            success: function (data) {
                var chtml=''
                if(data.code<0){
                    console.log(data.msg);
                }else if(data.length===0){
                    chtml+='';
                }else{
                    for(var i=0;i<data.length;i++){
                        var ndate=data[i].newDate.replace(/-/g,'/');
                        var newsdate=new Date(ndate);
                        if(i==0 && curpage==0){
                            chtml+='<div class="top_news"><div class="top_news_info"><a href="./news_detail.php'+location.search+'&newsid='+data[i].nid+'"><div class="news_date">'+FormateDate(newsdate)+'</div>';
                            chtml+='<h1 class="news_title">'+data[i].newname+'</h1>';
                            chtml+='<div class="news_content">'+data[i].newcontent+'</div>';
                            chtml+='<div class="newslistone"><img src="img/newslistone.jpg" /></div></a></div>'
                            chtml+='<div class="new_img"><img src="img/'+data[i].pic+'" /></div>'
                            chtml+='</div>';
                        }else{
                            chtml+='<div class="news"><a href="./news_detail.php'+location.search+'&newsid='+data[i].nid+'">';
                            chtml+='<div class="newsDate"><p class="day">'+FormateDay(newsdate)+'</p><p class="month">'+FormateMonth(newsdate)+'</p><p class="year">'+newsdate.getFullYear()+'</p></div>';
                            chtml+='<div class="news_date">'+FormateDate(newsdate)+'</div>';
                            chtml+='<div class="news_right">';
                            chtml+='<h1 class="news_title">'+data[i].newname+'</h1>';
                            chtml+='<p>发布者：<span>'+data[i].author+'</span>浏览次数：<span>'+data[i].seecount+'</span></p>';
                            chtml+='<div class="news_content">'+data[i].newcontent+'</div>';
                            chtml+='</div></a></div>';
                        }
                    }
                }
                document.querySelector('.company_news>div').innerHTML = chtml;


            },
            fail: function (data) {
                console.log('程序报错' + data);
            }
        });
    }
})
