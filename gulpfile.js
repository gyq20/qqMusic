var gulp = require('gulp');

//gulp中插件应用  下载插件-->取到插件-->应用插件
//压缩html
var htmlClean = require("gulp-htmlclean");

//压缩图片
var imageMin = require('gulp-imagemin');

//压缩js
var uglify = require('gulp-uglify');

//去掉js里面的调试语句
var debug = require('gulp-strip-debug');

//将less转换为css
var less = require('gulp-less');

//压缩css
var cleanCss = require('gulp-clean-css');

//给css添加前缀需要依赖两个插件：
//gulp-postcss 用这个插件的时候要将autoprofixer作为参数传进来
//autoprofixer
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

//开启服务器
var connect = require('gulp-connect');

var folder = {
    src: "src/",
    dist: "dist/"
}

//判断当前环境变量
var devMod = process.env.NODE_ENV == "development";

//export NODE_ENV=development 设置环境变量

gulp.task("html", function() {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("image", function() {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

gulp.task("css", function() {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("js", function() {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload());
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

//开启服务器
gulp.task('server', function(){
    connect.server({
        port: "8899",  //设置端口
        livereload: true  //自动刷新页面
    });
})

//监听三个文件夹
gulp.task("watch",function() {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
})


gulp.task("default", ["html", "css", "js","image","server","watch"]);

//gulp.src() 输出，参数为路径
//gulp.dest() 
//gulp.task() 创建任务
//gulp.watch() 监视文件