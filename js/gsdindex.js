domReady(function(){
    ajax({
        type:'GET',
        url:'data/productIndex.php',
        success:function(data){
			if(data[0].code<0){
				console.log(data[0].msg)
			}else{
            var proIndexHtml='';
            for(var i=0;i<data.length;i++){
                proIndexHtml+="<a href='./product_detail.php?parentid=4&typeid="+data[i].pid+"&pdtid="+data[i].did+"'><p>"+data[i].pname+"</p><div class='product_show'>";
                proIndexHtml+="<img src='img/"+data[i].pic+"' class='img_res'/>";
                proIndexHtml+="<p>"+data[i].dname+"</p></div></a>"
            }
            document.querySelector('.product>div').innerHTML=proIndexHtml;
			}
        },
        fail:function(data){
            console.log('程序报错'+data);
        }
    });
    var timer=null;
    var nexttimer=null,cur,next;
    var curIndex=0;
	var container=document.querySelector(".banner>div");
    var item=container.querySelectorAll(".item");
    item[0].style.display="block";
    var bannerImg=item[0].querySelector("img");
    BannerHeight(bannerImg,container);
	var bImgs=document.querySelectorAll(".banner>div img");
	imgAll(bImgs,function(){
		start();
	})
    function start(){
    var w=container.offsetWidth;
    cur=item[curIndex%3];
    next=item[(curIndex+1)%3];
    function step() {
        next.style.left=w+"px";
        cur.style.zIndex=100;
        next.style.zIndex=1000;
        next.style.display="block";   
        if (w >= 0) {
            w-=50;
            timer=window.requestAnimationFrame(step);
        }else{
            window.cancelAnimationFrame(timer);
            timer=null;
            cur.style.display="none";
            curIndex++;
            nexttimer=setTimeout(start,5000);
        }
    }
    timer=window.requestAnimationFrame(step);
    }
    
})




