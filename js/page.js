//页码
function showpage(count,curpage,fenys){
    var page = Math.ceil(count / fenys);

    var selpageHtml = '选择页码：<select name="pages">';
    for (var i = 1; i <= page; i++) {
        selpageHtml += '<option value="' + i + '">' + i + '</option>';
    }
    selpageHtml += '</select>';
    document.querySelector('.select_page').innerHTML = selpageHtml;

    document.querySelector('.show_page').innerHTML = subPages(count,curpage,fenys);

    EventUtil.addHandler(document.querySelector('.show_page'),'click',function(e){
        EventUtil.preventDefault(e);
        var select = document.querySelector('.select_page select');
        var that=EventUtil.getTarget(e);
        var cls=that.className;
        if(cls==='first'){
            select.value=1;
        }else if(cls==='last'){
            select.value=page;
        }else if(cls==='prev'){
            select.value=parseInt(select.value)-1;
        }else if(cls==='next'){
            select.value=parseInt(select.value)+1;
        }
        tigger(select);
    })

    var select = document.querySelector('.select_page select');
    EventUtil.addHandler(select,'change', function () {
        document.querySelector('.show_page').innerHTML=subPages(count,select.value,fenys);
    })
}
//页码
function subPages(count,curpage,fenys){
    var page = Math.ceil(count / fenys);
    var pageHtml = "";
    pageHtml += '记录总数：<span class="color_type">' + count + '</span>';
    pageHtml += '页数：<span class="color_type">'+(count==0?0:curpage)+'/' + page + '</span>';
    if(page==1 || page==0){
        pageHtml+='';
    }else if(curpage==page){
        pageHtml += '<a href="#" class="first">第一页</a><a herf="#" class="prev">上一页</a><span>最后一页</span>';
    }else if (page == 2 || curpage==1) {
        pageHtml += '<span>第一页</span><a herf="#" class="next">下一页</a><a herf="#" class="last">最后一页</a>';
    }else{
        pageHtml += '<a href="#" class="first">第一页</a><a herf="#" class="prev">上一页</a><a href="#" class="next">下一页</a><a href="#" class="last">最后一页</a>';
    }
    return pageHtml;
}
//js改变select值触发change事件
function tigger(sel){
    if (sel.fireEvent){
        sel.fireEvent('onchange');
				alert("aaa");
    }
    else{
        ev = document.createEvent("HTMLEvents");
        ev.initEvent("change", false, true);
        sel.dispatchEvent(ev);
				alert("bbb");
    }
}
