var gulp = require('gulp'),
  del = require('del'),
  pump = require('pump'),
  path = require('path'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  autoprefixer = require('gulp-autoprefixer'),
  notify =  require('gulp-notify');

// 任务名称
var tasks = 
[
  'js-jsc',
  'public-jsc',
  'demo-jsc',
  'js-cssc',
  'css-cssc',
  'js-imgc',  
  'img-imgc',
  'js-copy',  
  'index-copy',  
  'data-copy',  
  'public-copy',  
  'demo-copy'
],

colorerr = '\x1B[31m%s\x1B[39m';
 
function getPath(ph){
  return path.resolve(__dirname, ph);
}

function msglog(prew, file){
  console.log('\x1B[32m%s\x1B[39m',
    prew + file.path.replace(getPath('../../') + '\\', '')
  );
}

// JS 压缩
gulp.task('js-jsc', function (cb) {
  return gulp.src('../js/**/*.js')
    .pipe(uglify().on('error', function(err){
      console.log(colorerr, 'Compress Error! ' + err.message);
      this.end();
      }))
    .pipe(notify(function(file){ msglog('Compress-JS: ', file); }))
    .pipe(gulp.dest('../dist/js'));
});
gulp.task('public-jsc', function (cb) {
  return gulp.src('../public/**/*.js')
    .pipe(uglify().on('error', function(err){
      console.log(colorerr, 'Compress Error! ' + err.message);
      this.end();
    }))
    .pipe(notify(function(file){ msglog('Compress-JS: ', file); }))
    .pipe(gulp.dest('../dist/public'));
});

gulp.task('demo-jsc', function (cb) {
  return gulp.src('../demo/**/*.js')
    .pipe(uglify().on('error', function(err){
      console.log(colorerr, 'Compress Error! ' + err.message);
      this.end();
    }))
    .pipe(notify(function(file){ msglog('Compress-JS: ', file); }))
    .pipe(gulp.dest('../dist/demo'));
});
 

// css 压缩
gulp.task('js-cssc', function (cb) {
  return gulp.src('../js/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(cleanCss({compatibility:'ie9'}))
    .pipe(notify(function(file){ msglog('Compress-CSS: ', file); }))
    .pipe(gulp.dest('../dist/js'));
});

gulp.task('css-cssc', function (cb) {
  return gulp.src('../css/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(cleanCss({compatibility:'ie9'}))
    .pipe(notify(function(file){ msglog('Compress-CSS: ', file); }))
    .pipe(gulp.dest('../dist/css'));
});
 

// img 压缩
gulp.task('js-imgc', function (cb) {
  return gulp.src(['../js/**/*.gif', '../js/**/*.png', '../js/**/*.jpg'])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 7})
    ]))
    .pipe(notify(function(file){ msglog('Compress-IMG: ', file); }))
    .pipe(gulp.dest('../dist/js'))
});
gulp.task('img-imgc', function (cb) {
  return gulp.src(['../img/**/*.gif', '../img/**/*.png', '../img/**/*.jpg'])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 7})
    ]))
    .pipe(notify(function(file){ msglog('Compress-IMG: ', file); }))
    .pipe(gulp.dest('../dist/img'))
});

 
// 复制文件到dist文件夹
gulp.task('js-copy', function (cb) {
  return gulp.src([ 
      '../js/**/*.tpl', '../js/**/*.ttf', '../js/**/*.woff', '../js/**/*.json', '../js/**/*.svg'
    ])
    .pipe(notify(function(file){ msglog('Copied-File: ', file); }))
    .pipe(gulp.dest('../dist/js'))
});
// index 入口文件
gulp.task('index-copy', function (cb) {
  return gulp.src([ '../index.html', '../main.js' ])
    .pipe(notify(function(file){ msglog('Copied-File: ', file); }))
    .pipe(gulp.dest('../dist'))
});
// data 目录
gulp.task('data-copy', function (cb) {
  return gulp.src([ '../data/**/*.json' ])
    .pipe(notify(function(file){ msglog('Copied-File: ', file); }))
    .pipe(gulp.dest('../dist/data'))
});
// public 目录
gulp.task('public-copy', function (cb) {
  return gulp.src([ '../public/**/*.html',  '../public/**/*.tpl' ])
    .pipe(notify(function(file){ msglog('Copied-File: ', file); }))
    .pipe(gulp.dest('../dist/public'))
});
// demo 目录
gulp.task('demo-copy', function (cb) {
  return gulp.src([  '../demo/**/*.tpl','../demo/**/*.html' ,'../demo/**/*.json' ])
    .pipe(notify(function(file){ msglog('Copied-File: ', file); }))
    .pipe(gulp.dest('../dist/demo'))
});
 
gulp.task('default', tasks);
