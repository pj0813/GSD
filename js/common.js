var eventQueue = [];
var isReady = false;
var isBind = false;
//判断浏览器
var Browser=new Object();
Browser.userAgent=window.navigator.userAgent.toLowerCase();
Browser.ie=/msie/.test(Browser.userAgent);
Browser.Moz=/gecko/.test(Browser.userAgent);

window.onload=function(){
    ajax({
        type:'GET',
        url:'data/getNav.php',
        success:function(data){
			if(data[0].code<0){
				console.log(data[0].msg);
			}else {
                var htmlConent = '';
                var submenu = [];
                for (var i = 1; i < data.length; i++) {
                    var search = "?parentid=" + data[i].mid;
                    var subsearch = "?parentid=" + data[i].mid;
                    submenu = data[i].subnames;
                    search += (submenu.length > 0) ? "&typeid=" + submenu[0].subid : "";
                    htmlConent += "<dl>";
                    htmlConent += "<dt><a href='./" + data[i].murl + search + "'>" + data[i].menuname + "</a></dt>";
                    if (submenu.length > 0) {
                        for (var j = 0; j < submenu.length; j++) {

                            if (submenu[j].threesub.length > 0) {
                                addsearch = "&subtype=" + submenu[j].threesub[0].cid;
                            } else {
                                addsearch = "";
                            }
                            if (submenu.length != 1) {
                                htmlConent += "<dd><a href='./" + submenu[j].suburl + subsearch + "&typeid=" + submenu[j].subid + addsearch + "'>" + submenu[j].subname + "</a></dd>"
                            }

                        }
                    }
                    htmlConent += "</dl>";
                }
                document.querySelector('.nav_foot>.foot_type').innerHTML = htmlConent;
                var htmlfooter = '';
                for (var i = 0; i < data.length; i++) {
                    submenu = data[i].subnames;
                    var search = (submenu.length > 0) ? "&typeid=" + submenu[0].subid : "";
                    if (submenu.length == 0 || submenu.length == 1) {
                        htmlfooter += "<li><a href='./" + data[i].murl + (data[i].mid == 1 ? "" : "?parentid=" + data[i].mid) + "'>" + data[i].menuname + "</a></li>";
                    } else {
                        htmlfooter += "<li class='two_menu'><a href='./" + data[i].murl + "?parentid=" + data[i].mid + search + "'>" + data[i].menuname + "</a>";
                        if (submenu.length != 1) {
                            htmlfooter += "<div class='show_down'><ul class='inline-list'>";
                            for (var j = 0; j < submenu.length; j++) {
                                var subsearch = "&typeid=" + submenu[j].subid;
                                if (submenu[j].threesub.length > 0) {
                                    subsearch += "&subtype=" + submenu[j].threesub[0].cid;
                                }
                                htmlfooter += "<li><a href='./" + submenu[j].suburl + "?parentid=" + data[i].mid + subsearch + "'><img src='img/" + submenu[j].pic + "'/>" + submenu[j].subname + "</a></li>"
                            }
                            htmlfooter += "</ul></div>";
                        }
                        htmlfooter += "</li>"
                    }

                }
                document.querySelector('.nav>ul').innerHTML = htmlfooter;

                var bhtml = "";
                var ohtml = "";
                var search = getSearch(location.search);
                var pid = search.parentid;
                var tid = search.typeid;
                var subid = search.subtype;
                if (pid != undefined) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].mid == pid) {
                            if (data[i].subnames.length > 0) {
                                for (var j = 0; j < data[i].subnames.length; j++) {
                                    var sub = data[i].subnames;
                                    var threesearch = sub[j].threesub.length > 0 ? "&subtype=" + sub[j].threesub[0].cid : "";
                                    bhtml += "<li><a href='" + sub[j].suburl + "?parentid=" + data[i].mid + "&typeid=" + sub[j].subid + threesearch + "'>" + sub[j].subname + "</a></li>";
                                    ohtml += "<li><a href='" + sub[j].suburl + "?parentid=" + data[i].mid + "&typeid=" + sub[j].subid + threesearch + "'><i></i>" + sub[j].subname + "</a>";
                                    if (sub[j].threesub != []) {
                                        var tm = sub[j].threesub;
                                        ohtml += "<ul class='two'>"
                                        for (var k = 0; k < tm.length; k++) {
                                            ohtml += "<li><a href='./" + sub[j].suburl + "?parentid=" + data[i].mid + "&typeid=" + sub[j].subid + "&subtype=" + tm[k].cid + "'><i></i>" + tm[k].cname + "</a></li>"
                                        }
                                        ohtml += "</ul>"
                                    }
                                    ohtml += "</li>"
                                }
                            }
                        }
                    }
                    document.querySelector(".sub_nav").innerHTML = bhtml;
                    document.querySelector(".aboutUs_left>.one").innerHTML = ohtml;
                }
                navheight();
                var two = document.querySelectorAll('.two_menu');
                for (var i = 0; i < two.length; i++) {
                    two[i].timer = null;
										two[i].querySelector(".show_down").style.height = 0;
                    //qsaWorker.qsaWorkerShim(two[i], ".show_down").style.height = 0;
                    EventUtil.addHandler(two[i], 'mouseenter', function (e) {
                        move(this, 'down', 100);
                    });
                    EventUtil.addHandler(two[i], 'mouseleave', function (e) {
                        move(this, 'up', 0);
                    });

                }
                //下拉菜单动画效果
                function move(obj, mode, target) {
                    window.cancelAnimationFrame(obj.timer);
                    var m=obj.querySelector(".show_down").style;
                    //var m = qsaWorker.qsaWorkerShim(obj, ".show_down").style;
                    var h = parseInt(m.height);
                    function step() {
                        if (mode == "down") {
                            var i = 1;
                            var r = (h >= target);
                        } else if (mode == "up") {
                            var i = -1;
                            var r = (h <= target);
                        }
                        if (r) {
                            window.cancelAnimationFrame(obj.timer);
                            obj.timer = null;
                        } else {
                            h += i * 10;

                            m.height = h + "px";
                            obj.timer = window.requestAnimationFrame(step);

                        }
                    }

                    obj.timer = window.requestAnimationFrame(step);
                }

            }
        },
        fail:function(data){
            console.log('程序报错'+data);
        }
    });

    var ele=document.querySelector('.navbar_btn');
    EventUtil.addHandler(ele,'click',function(e){
        toggleClass(this,'navbar_btn_click');
        var nav=document.querySelector('.nav');
        toggleClass(nav,'active');
        var mask=document.querySelector('.mask');
        if(hasClass(this,'navbar_btn_click')){
            mask.style.display='block';
        }else{
            mask.style.display='none';
        }
    })
    centerImg();
}

domReady(function(){
	requestAnimation();
    //query();
    var search = getSearch(location.search);
    var zstype = search.subtype? search.subtype : 0;
    var zsid=search.typeid?search.typeid : 0;
    if(zsid!=0){
        ajax({
            type: 'GET',
            url: 'data/tab.php',
            data:{subid:zstype,id:zsid},
            success: function (data) {
                if(data.code==undefined){
                    var name=(zstype==0)?data[0].subname:data[0].cname;  
                }
                var bHtml='<b class="toRight"></b>'+name;
                document.querySelector('.breadcrumb>span').innerHTML=bHtml;
            },
            fail: function (data) {
                console.log('程序报错' + data);
            }
        });
    }


})
window.onresize = function(){
    centerImg();
    navheight();
    var ele=document.querySelector('.navbar_btn');
    var mask=document.querySelector('.mask');
    if(hasClass(ele,'navbar_btn_click')){
        mask.style.display='block';
    }else{
        mask.style.display='none';
    }
    var wh=document.documentElement.clientHeight;
    if(wh<300){
        window.resizeTo(document.body.clientHeight,300); 
    }
    var pageNO=document.querySelector(".htmlNo");
	if(pageNO){
		if(pageNO.value=="index"){
        var container=document.querySelector(".banner>div");
        var item=container.querySelectorAll(".item");
        var bannerImg=item[0].querySelector("img");
        BannerHeight(bannerImg,container);
    }else if(pageNO.value=="cert"){
        var oImg=document.querySelector(".imgmodel>div>img");
        alertWidth(oImg);
    }
	}
    
}
function centerImg(){
    var cimg=document.querySelectorAll('.center_img');
    for(var i=0;i<cimg.length;i++){
        var cp= cimg[i].parentNode;
        var w=cp.offsetWidth;
        var l=(1920-w)/2;
        cimg[i].style.left=-l+'px';
    }
}
function imgwidth(){
    var down=document.querySelectorAll('.two_menu>.show_down');
        for(var i=0;i<down.length;i++){
            mulitImg =down[i].querySelectorAll('img');
			var curdown=down[i];
			imgAll(mulitImg,(function(){
                var limg=curdown.querySelectorAll("li");
                var lwidth=0;
                for(var j=0;j<limg.length;j++){
                    lwidth+=122;
                }
                curdown.style.width=lwidth+'px';
                var cw = document.documentElement.clientWidth || document.body.clientWidth;
				var right=cw-parseFloat(curdown.style.width)-getOffsetLeft(curdown.parentNode);
				if(right<=0){
                   addClass(curdown,'show_down_right');
                }else{
                   removeClass(curdown,'show_down_right');
                }
			})(i))
        }
}



//document.querySelector和document.querySelectorAll
function query(){
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }

    if (!document.querySelector) {
        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };
    }
}
function navheight(){
    var ch = document.documentElement.clientHeight || document.body.clientHeight;
    var cw = document.documentElement.clientWidth || document.body.clientWidth;
    var iew=window.innerWidth;
    var nav=document.querySelector(".nav");
    if(iew==undefined){
        iew=cw;
    }
    if(iew<=767){
        nav.style.height=ch+"px";
        var down=document.querySelectorAll('.two_menu>.show_down');
        for(var i=0;i<down.length;i++){
            try{
                down[i].style.width=10+'rem';
            }catch(err){
                down[i].style.width=130+'px';
            }
        }
    }else{
        if(nav.hasAttribute('style')){
            nav.removeAttribute('style');
        }
        imgwidth();
    }
}
//元素左边框距离浏览器左侧的距离
var getOffsetLeft = function(obj){
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while(val != null){
		tmp += val.offsetLeft;
      val = val.offsetParent;
     }

  return tmp;
  }
//obj:type,url,data, async,success,fail
function ajax(obj){
    var xhr=null;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(obj.async===undefined){
        obj.async=true;
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status===200){
                obj.success&& obj.success(obj.dataType==='HTML'?xhr.responseText:JSON.parse(xhr.responseText));
            }else{
                obj.fail && obj.fail(xhr.status);
            }
        }
    }
    var type=obj.type.toUpperCase();
    var data=params(obj.data);
    if(type==='GET'){
        data=((data!=='')?('?'+data):'');
        xhr.open(obj.type,obj.url+data,obj.async);
        xhr.send(null);
    }else if(type==='POST'){
        xhr.open(obj.type,obj.url,obj.async);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
}

//对象序列化
function params(data){
    var arr=[];
    for(k in data){
        arr.push(encodeURIComponent(k)+"="+encodeURIComponent(data[k]));
    }
    return arr.join('&')
}


//判断是否含有类名
function hasClass(ele,cls){
    return ele.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"));
}
//添加类
function addClass(ele,cls){
    if(!hasClass(ele,cls)){

        ele.className+=" "+cls;
    }
}
//删除类名
function removeClass(ele,cls){
    if(hasClass(ele,cls)){
        var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)");
        ele.className=ele.className.replace(reg,(reg===" "+cls+" ")?" ":"");
    }
}
//切换类
function toggleClass(ele,cls){
    if(hasClass(ele,cls)){
        removeClass(ele,cls);
    }else{
        addClass(ele,cls);
    }
}
//将地址栏中键值对变成对象
function getSearch(urlsearch){
    if(urlsearch){
        var arr=urlsearch.substr(1).split('&');
        var obj={};
        for(var i=0;i<arr.length;i++){
            var arr1=arr[i].split("=");
          obj[arr1[0]]=arr1[1];
        }
        return obj;
    }else{
        return '';
    }

}
//对日期的格式化
function FormateMonth(date){
    var m=date.getMonth()+1;
    return m>10?m:'0'+m;
}
function FormateDay(date){
    var d=date.getDate();
    return d>10?d:'0'+d;
}
function FormateDate(date){
    return date.getFullYear()+'-'+FormateMonth(date)+'-'+FormateDay(date);
}
//获得图片原始尺寸
function getImgNatural(oImg, callback) {
	var nWidth, nHeight;
	var nImg = new Image();
	nImg.src = oImg.src;
	if(nImg.complete) { // 图片已经存在于浏览器缓存
		callback({w: nImg.width, h:nImg.height});
　　}else{
		nImg.onload = function() {
			if (!oImg.naturalWidth) { // 现代浏览器
　　　　		nWidth = oImg.naturalWidth;
　　　　		nHeight = oImg.naturalHeight;
　　　　	}else{
				nWidth = nImg.width,
				nHeight = nImg.height;
			}
			callback({w: nWidth, h:nHeight});
　　　　}
　　}
}

 
//判断是否加载完成
function Imagess(url,imgid,callback,other){ 
  var val=url;
  var img=new Image();
  if(Browser.ie){
    img.onreadystatechange =function(){ 
      if(img.readyState=="complete"||img.readyState=="loaded"){
        callback(img,imgid,other);
      }
    }    
  }else if(Browser.Moz){
    img.onload=function(){
      if(img.complete==true){
        callback(img,imgid,other);
      }
    }    
  } 
  img.src=val;
}
//获得滚动条距离顶端的距离
function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) { //chrome浏览器
        scrollPos = window.pageYOffset; }
    else if (document.compatMode && document.compatMode != 'BackCompat')
    { scrollPos = document.documentElement.scrollTop; }
    else if (document.body) { scrollPos = document.body.scrollTop; }
    return scrollPos;
}
//判断是否图片加载完成
function imgAll(mulitImgs,callback){
     var img = [], flag = 0; 
	 var imgTotal=mulitImgs.length;
     for(var j = 0 ; j <imgTotal; j++){
        img[j] = new Image();
        img[j].src = mulitImgs[j].src;
        if(Browser.ie){
            EventUtil.addHandler(img[j],'readystatechange',function(){
		        //img[j].onreadystatechange=function(e){
                console.log("aaa");
		    if(this.readyState=="complete"||this.readyState=="loaded"){
				flag++;
				if(flag==imgTotal){
                    callback&&callback();
				}
		    }
          })
        }else if(Browser.Moz){
          img[j].onload=function(){
            if(this.complete==true){
				flag++;
				if(flag==imgTotal){
                    callback&&callback();
				}
            }
          }    
        } 
     }         
}
function BannerHeight(oImg,d){
    var bw=document.documentElement.clientWidth;
    getImgNatural(oImg, function(a){
        var bh=parseInt(bw*(a.h)/(a.w));    
        d.style.height=bh+"px";

    })
}
//设置弹出框的宽度
function alertWidth(oImg){    
    var wh=document.documentElement.clientHeight ;
    var ww=document.documentElement.clientWidth;
    var p=document.querySelector(".imgmodel>p");
	getImgNatural(oImg,function(a){
        var mw=parseInt((wh-100)*(a.w)/(a.h));
        if(wh<250){
            p.style.width=oImg.style.width=parseInt(150*(a.w)/(a.h))+"px";
        }else if(ww<mw){
            p.style.width=oImg.style.width=ww-100+"px"; 
        }else if((a.h)>wh){
            p.style.width=oImg.style.width=mw+"px";
        }
	})
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1;
    if(isIE){
        var ie=ua.match(/msie ([\d.]+)/)[1];
        if (ie.indexOf("8") > -1) {
            var im=document.querySelector(".imgmodel");
            im.style.marginLeft=-im.offsetWidth/2+'px';
        }
    }


}

function requestAnimation(){
	//requestAnimationFrame的兼容性
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    var prefix;
//通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
    for( var i = 0; i < prefixes.length; i++ ) {
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
        cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
    }

//如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
    if ( !requestAnimationFrame || !cancelAnimationFrame ) {
        requestAnimationFrame = function( callback, element ) {
            var currTime = new Date().getTime();
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function() {
                callback( currTime + timeToCall );
            }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function( id ) {
            window.clearTimeout( id );
        };
    }

//得到兼容各浏览器的API
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;


}


//DOMContentLoaded的兼容性IE8
function domReady(fn){
    if(isReady){
        fn.call(window);
    }
    else{
        eventQueue.push(fn);
    };
    bindReady();
};
function bindReady(){
    if(isReady) return;
    if(isBind) return;
    isBind=true;
    if(window.addEventListener){
        document.addEventListener('DOMContentLoaded',execFn,false);
    }
    else if(window.attachEvent){
        doScroll();
    };
};
function doScroll(){
    try{
        document.documentElement.doScroll('left');
    }
    catch(error){
        return setTimeout(doScroll,20);
    };
    execFn();
};
function execFn(){
    if(!isReady){
        isReady=true;
        for(var index=0;index<eventQueue.length;index++){
            eventQueue[index].call(window);
        };
        eventQueue = [];
    };
};

var EventUtil={
    addHandler:function(element,type,handler){//添加事件
        var h = function (){
            return handler.apply(element, arguments);
        };
        if(element.addEventListener){
            element.addEventListener(type,h,false);  //使用DOM2级方法添加事件
        }else if(element.attachEvent){                    //使用IE方法添加事件
            element.attachEvent("on"+type,h);
        }else{
            element["on"+type]=h;          //使用DOM0级方法添加事件
        }
    },

    removeHandler:function(element,type,handler){  //取消事件
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },

    getEvent:function(event){  //使用这个方法跨浏览器取得event对象
        return event?event:window.event;
    },

    getTarget:function(event){  //返回事件的实际目标
        return event.target||event.srcElement;
    },

    preventDefault:function(event){   //阻止事件的默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },

    stopPropagation:function(event){  //立即停止事件在DOM中的传播
        //避免触发注册在document.body上面的事件处理程序
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },

    getRelatedTarget:function(event){  //获取mouseover和mouseout相关元素
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){      //兼容IE8-
            return event.toElement;
        }else if(event.formElement){
            return event.formElement;
        }else{
            return null;
        }
    },

    getButton:function(event){    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            switch(event.button){   //将IE模型下的button属性映射为DOM模型下的button属性
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;  //按下的是鼠标主按钮（一般是左键）
                case 2:
                case 6:
                    return 2;  //按下的是中间的鼠标按钮
                case 4:
                    return 1;  //鼠标次按钮（一般是右键）
            }
        }
    },

    getWheelDelta:function(event){ //获取表示鼠标滚轮滚动方向的数值
        if(event.wheelDelta){
            return event.wheelDelta;
        }else{
            return -event.detail*40;
        }
    },

    getCharCode:function(event){   //以跨浏览器取得相同的字符编码，需在keypress事件中使用
        if(typeof event.charCode=="number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    }

};
var qsaWorker = {
    idAllocator:10000,
    qsaWorkerShim:function(element, selector) {
        try{
            element.querySelector(selector);
            return element.querySelector(selector);
        }catch(err){
            var needsID = element.id === "";
            if (needsID) {
                ++this.idAllocator;
                element.id = "__qsa" + this.idAllocator;
            }
            try {
                return document.querySelector("#" + element.id + " " + selector);
            }
            finally {
                if (needsID) {
                    element.id = "";
                }
            }
        }

    }
}
