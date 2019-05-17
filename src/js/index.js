

var root = window.player;
var dateList;

var audio = root.audioManager;
var control;
var timer;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(date) {
            console.log(date);
            dateList = date;
            control = new root.controlIndex(date.length);
            root.render(date[0]);
            root.pro.renderAllTime(date[0].duration);
            audio.getAudio(date[0].audio);
            bindEvent();
            bindTouch();
        },
        error: function() {
            console.log("error");
        }
    })
}

getData("../mock/data.json");

//将信息渲染到页面上

//点击按钮
function bindEvent() {

    //自定义事件：
    $('body').on('play:change', function(e, index){
        $('.img-box').css({
                'transform' : 'rotateZ(0deg)'
            }).attr('data-deg', 0+"");
        root.render(dateList[index]);
        root.pro.renderAllTime(dateList[index].duration);
        audio.getAudio(dateList[index].audio);
        if(audio.status == 'play'){
            audio.play();
            var deg = parseInt($('.img-box').attr('data-deg'));
            rotated(deg);
        }
    });

    $('.prev').on('click', function() {
        var i = control.prev()
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop();
        }
    })

    $('.next').on('click', function() {
        var i = control.next();
        
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if(audio.status == 'pause'){
            root.pro.stop();
        }
    })

    $('.play').on('click', function() {
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = parseInt($('.img-box').attr('data-deg'));
            rotated(deg);
        }
        else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.control .play').toggleClass('playing');
    })
    

}

function bindTouch() {
    var $spot = $('.spot');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart', function() {
        root.pro.stop();
    }).on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - 1) / w;
        if(per >= 0 && per <=1){
            root.pro.update(per);
        }
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - 1) / w;
        if(per >= 0 && per <=1){
            root.pro.start(per);
            var time = per * dateList[control.index].duration;
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    })
}
function rotated(deg) {
    clearInterval(timer);
    timer = setInterval(function() {
        deg +=1;
        $('.img-box').attr('data-deg', deg+"");
        $('.img-box').css({
            'transform' : 'rotateZ(' + deg + 'deg)',
            // 'transition' : 'all 1s ease-out'
        })
    },60)
}

//音频的播放、暂停  切歌
//进度条运动和拖拽
//图片旋转
//列表切歌