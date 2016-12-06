
var swiperRender=(function () {
    return {
        init: function () {
            var mySwiper = new Swiper('.swiper-container',{
                direction: 'vertical',
                loop: true,
                onTransitionEnd:function (swiper) {
                    var curIndex = swiper.activeIndex;
                    var slides = swiper.slides;
                    [].forEach.call(slides, function (item, index) {
                        item.id='';
                        if(index==curIndex){
                            switch (index){
                                case slides.length-1:
                                    item['id']='page1';
                                    break;
                                case 0:
                                    item['id']='page'+(slides.length-2);
                                    break;
                                default :
                                    item['id']='page'+curIndex;
                            }
                            if(index==6||index==0){
                                (function () {
                                    if(timer){
                                        window.clearInterval(timer);
                                        return;
                                    }
                                    var $slide6=$('.slide6');
                                    var str='TEL:18332568835',
                                        str1='POST:Zhang_li_bin_post@163.com',
                                        str2='QQ:815243393',
                                        n=-1,
                                        strT='',
                                        strP='',
                                        strQ='',
                                        p1=$slide6.find('.tel'),
                                        p2=$slide6.find('.post'),
                                        p3=$slide6.find('.qq');
                                    var timer=window.setInterval(function () {
                                        n++;
                                        strT=str.substring(n,0);
                                        strP=str1.substring(n,0);
                                        strQ=str2.substring(n,0);
                                        p1.html(strT);
                                        p2.html(strP);
                                        p3.html(strQ);
                                        if(n==str1.length){
                                            window.clearInterval(timer);
                                        }
                                    },100);


                                })();

                            }
                        }
                        return;
                    });
                    var lis=$('.cubeBox').find('li');
                    lis.tap(function () {
                        swiperRender.init(swiper.slides[parseFloat($(this).attr('data-id'))]);
                     });
                }
            });
        }
    }
})();
swiperRender.init();

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
});
$('img').on('mousemove', function (e) {
    e.preventDefault();
});

var cubeRender=(function () {
    var $cube=$('.cube'),
        $cubeBox=$cube.children('.cubeBox');
    function start(e){
        var point = e.touches[0];
        $(this).attr({
            strX:point.pageX,
            strY:point.pageY,
            isMove:false,
            changeX:0,
            changeY:0
        })
    }
    function moving(e){
        var point = e.touches[0];
        var changeX=point.pageX-parseFloat($(this).attr('strX')),
            changeY=point.pageY-parseFloat($(this).attr('strY'));
        $(this).attr({
            changeX:-changeX,
            changeY:changeY
        });
        if(Math.abs(changeX)>10||Math.abs(changeY)>10){
            $(this).attr('isMove',true);
        }
    }
    function end(e){
        var changeX=parseFloat($(this).attr('changeX')),
            changeY=parseFloat($(this).attr('changeY')),
            isMove=$(this).attr('isMove');
        if(isMove==='false') return;
        var rotateX=parseFloat($(this).attr('rotateX')),
            rotateY=parseFloat($(this).attr('rotateY'));
        rotateX=rotateX-changeY/3;
        rotateY=rotateY-changeX/3;
        rotateX = rotateX - changeY / 3;
        $(this).css('transition', '.3s').css('transform', 'scale(0.6) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)').attr({
            rotateX:rotateX,
            rotateY:rotateY
        })
    }

    return{
        init:function(){
            $cubeBox.attr({
                rotateX:-30,
                rotateY:45
            });
            $cubeBox.on('touchstart',start).on('touchmove',moving).on('touchend',end);
        }
    }
})();
cubeRender.init();

var musicRender=(function () {
    return{
        init: function () {
            var music=document.querySelector('.music'),
                raise=document.querySelector('#raise');
            window.setTimeout(function () {
                raise.play();
                raise.addEventListener('canplay', function () {
                    music.style.opacity='1';
                    $(music).addClass('musicCur');
                },false);
            },1500);
            $(music).tap(function () {
                if(raise.paused){
                    raise.play();
                    $(music).addClass('musicCur');
                }else{
                    raise.pause();
                    $(music).removeClass('musicCur');
                }
            })

        }
    }
})();
musicRender.init();

