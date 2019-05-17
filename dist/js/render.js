
//实现页面渲染 img + info + like-btn

(function($, root){

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }

    function renderInfo(info) {
        var str = '<div class="song-name">'+ info.song +'</div>\
                <div class="singer-name">'+ info.singer +'</div>\
                <div class="album-name">'+ info.album +'</div>'
        $('.song-info').html(str);
    }
    function renderIsLike(like) {
        if(like) {
            $('.control .like').addClass('likeing');
        }else{
            $('.control .like').removeClass('liking');
        }
    }

    root.render = function(date) {
        renderImg(date.image);
        renderInfo(date);
        renderIsLike(date.isLike);
    }



})(window.Zepto, window.player || (window.player = {}));