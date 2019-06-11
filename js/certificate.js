domReady(function(){
    var search = getSearch(location.search);
    var zstype = search.subtype;
    getCert(zstype,0,12);
    var urlsql='SELECT count(*) as pages FROM certificate WHERE cid='+zstype;
    ajax({
        type: 'GET',
        url: 'data/pages.php',
        data:{sql:urlsql},
        success: function (data) {
            if(data.code<0){
                console.log(data.msg)
            }else{
                var count = data[0].pages;
                showpage(count,1,12);
                var select = document.querySelector('.select_page select');
                EventUtil.addHandler(select,'change', function () {
                    getCert(zstype, select.value-1,12);
                })    
            }
            
        },
        fail: function (data) {
            console.log('程序报错' + data);
        }
    });
    //证书显示
    function getCert(type, curpage,fenys) {
        ajax({
            type: 'GET',
            url: 'data/certificate.php',
            data: {cid: type, page: curpage,fenpage:fenys},
            success: function (data) {
                if(data.code<0){
                    chtml='';
                    console.log(data.msg)
                }else if(data.length===0){
                    chtml='';
                }else{
                    var chtml = "<ul class='inline-list honorlist'>";
                    for (var i = 0; i < data.length; i++) {
                        chtml += "<li><a href='img/" + data[i].bigpic + "'><div><img src='img/" + data[i].fpic + "'></div><p>" + data[i].fname + "</p></a></li>"
                    }
                    chtml += "</ul>";

                }
                document.querySelector('.certificate>div').innerHTML = chtml;
                clickimg();   

            },
            fail: function (data) {
                console.log('程序报错' + data);
            }
        });
    }

})
function clickimg(){
    var imgclick=document.querySelectorAll(".honorlist a");
for(var i=0;i<imgclick.length;i++){
    (function(i){
        EventUtil.addHandler(imgclick[i],'click',function(e){
            EventUtil.preventDefault(e);
            document.querySelector(".cmask").style.display='block';
            document.documentElement.style.overflow="hidden";
            document.body.style.overflow="hidden";
            this.index=i+1;
            this.src=this.href;
            this.name=qsaWorker.qsaWorkerShim(this,"p").innerHTML;
            var oImg=document.querySelector(".imgmodel>div>img");
            var self=this;
			Imagess(self.src,oImg,checkimg,function(){
                var phtml="<span class='curIndex'>"+self.index+"</span>/<span>"+imgclick.length+"</span>-"+self.name;
                document.querySelector(".imgmodel>p").innerHTML=phtml;
            });

        })
    })(i)
}
var prev=document.querySelector(".imgleft");
var next=document.querySelector(".imgright");
    EventUtil.addHandler(prev,'click',function(e){
        EventUtil.preventDefault(e);
    var index=parseInt(document.querySelector(".imgmodel .curIndex").innerHTML);
    var imgclick=document.querySelectorAll(".honorlist a");
    index--;
    if(index<1){
        index=imgclick.length;
    }
    var curImg=document.querySelectorAll(".honorlist a")[index-1];
    var oImg=document.querySelector(".imgmodel>div>img");
    var imgo=new Image();
	imgo.src=curImg.href;
	if(!imgo.complete){
        document.querySelector(".preload").style.display="block";
    };
    Imagess(curImg.href,oImg,checkimg,function(){
        var phtml="<span class='curIndex'>"+index+"</span>/<span>"+imgclick.length+"</span>-"+curImg.querySelector("p").innerHTML;
        document.querySelector(".imgmodel>p").innerHTML=phtml;
    }); 
    
})
    EventUtil.addHandler(next,'click',function(e){
        EventUtil.preventDefault(e);
    var index=parseInt(document.querySelector(".imgmodel .curIndex").innerHTML);
    var imgclick=document.querySelectorAll(".honorlist a");
    index++;
    if(index>imgclick.length){
        index=1;
    }
    var curImg=document.querySelectorAll(".honorlist a")[index-1];
    var oImg=document.querySelector(".imgmodel>div>img");

	var imgo=new Image();
	imgo.src=curImg.href;
	if(!imgo.complete){
        document.querySelector(".preload").style.display="block";
    };
	Imagess(curImg.href,oImg,checkimg,function(){
        var phtml="<span class='curIndex'>"+index+"</span>/<span>"+imgclick.length+"</span>-"+curImg.querySelector("p").innerHTML;
        document.querySelector(".imgmodel>p").innerHTML=phtml;
    });     
})

    EventUtil.addHandler(document.querySelector(".close"),'click',function(){
    document.querySelector(".cmask").style.display='none';
    document.documentElement.style.overflow="auto";
    document.body.style.overflow="auto";
	document.querySelector(".imgmodel>div>img").src="";
	document.querySelector(".imgmodel>p").innerHTML="";
	document.querySelector(".preload").style.display="block";
	document.querySelector(".imgmodel").style.display="none";

})    
}
function checkimg(obj,imgid,other){
document.querySelector(".preload").style.display="none";
document.querySelector(".imgmodel").style.display="block";
imgid.src=obj.src;
alertWidth(imgid);
if(other){
    other();
}
}




