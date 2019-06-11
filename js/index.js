$(function(){
    $('.school').on('mouseenter','img',function(){
        $('.photo1').addClass('roater');
        $('.photo2').addClass('roatem');
        $('.photo3').addClass('roatel');
    })
    $('.school').on('mouseleave','img',function(){
        $('.photo1').removeClass('roater');
        $('.photo2').removeClass('roatem');
        $('.photo3').removeClass('roatel');
    })
    $('.school').on('click','img',function(){
        $('.school>img').removeClass('active');
        $(this).addClass('active');
    })
    $('.project_detail a').hover(
        function(){
            $(this).children('.mask').show();
            $('.mask span').animate({left:'0',opacity:1});
            $('.mask p').animate({right:'0'});
        },function(){
           $(this).children('.mask').hide();
           $('.mask span').css('left','-100%');
           $('.mask p').css('right','-110%');
        }
    )
    //animates();
    //滚动到相应位置产生动画
    var go=0;
    $(window).scroll(function(){
        //animates();
        var wHeight=$(window).height();
        var gHeight=$(window).scrollTop();
        $('.wow').each(function(i){
            var cHeight=$(this).offset().top;
            if(cHeight-gHeight<wHeight){

            }
        })
    })

    /*function animates(){
        var wHeight=$(window).height();
        var gHeight=$(window).scrollTop();
        $('.wow').each(function(i){
            var cHeight=$(this).offset().top;
            if(cHeight-gHeight<wHeight){
                /*if($(this).parents().is('.info-right')){
                 var cindex=$('.wow').index(this);
                 var prev=$('.wow')[cindex-1];
                 var delay=0;
                 var zx=1;
                 if($(prev).parents().is('.info-right')){
                 delay=(parseFloat($(prev).css('animation-delay'))+0.5)*zx;
                 $(this).css('animation-delay',delay+'s');
                 }
                 $(this).addClass(' animated bounceInRight')
                 var next=$('.wow')[cindex+1];
                 var nextHeight=$(next).offset().top;
                 if(nextHeight-gHeight>wHeight){
                 zx=0;

                 }

                 }
                if($(this).hasClass("skills_detail")){
                    //进度条特效
                    if(go==0){
                        $('.progress').each(function(){
                            go=1;
                            var t = $(this),
                                dataperc = t.attr('data-perc');
                            console.log(dataperc);
                            t.find(".progress-bar").animate({width:dataperc+'%'});
                            function step(){
                                var pcont=Math.round(parseInt(t.find(".progress-bar").css('width'))/4.55);
                                t.prev().find("span").text(pcont+"%");
                                if(pcont>=dataperc){
                                    clearInterval(timer);
                                    timer=null;
                                }
                            }
                            var timer=setInterval(step,0);

                        });
                    }
                }
                if($(this).hasClass("navbar-nav")){
                    $(this).find("a").addClass("action");
                }
            }else{

            }

        })
    }*/
})
