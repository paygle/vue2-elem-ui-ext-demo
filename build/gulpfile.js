var gulp = require('gulp'),
  cfg = require('./config.js'),
  del = require('del'),
  pump = require('pump'),
  path = require('path'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  autoprefixer = require('gulp-autoprefixer'),
  notify =  require('gulp-notify');
 
  // console.log('\x1B[36m%s\x1B[0m', 'color font')

function getPath(ph){
  return path.resolve(__dirname, ph);
}

function msglog(prew, file){
  console.log('\x1B[32m%s\x1B[39m',
    prew + file.path.replace(getPath('../../') + '\\', '')
  );
}

gulp.task('del', function (cb) {
  del.sync([getPath('../dist/**'), '!'+getPath('../dist')]).then(paths => {
    console.log('\x1B[33m%s\x1B[39m','Deleted files and folders:\n' + paths.join('\n'));
    cb();
  });
});

gulp.task('js-compress', ['del'], function (cb) {
 
  pump([
      gulp.src('../js/**/*.js'),
      uglify(),
      notify(function(file){ msglog('JSCompress: ', file); }),
      gulp.dest('../dist/js')
    ],
    cb
  );
});

gulp.task('css-compress', ['del'],  function (cb) {
  
   pump([
      gulp.src('../js/**/*.css'),
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      }),
      cleanCss({compatibility:'ie9'}),
      notify(function(file){ msglog('CSSCompress: ', file); }),
      gulp.dest('../dist/js')
     ],
     cb
   );
 });
 
 gulp.task('img-compress', ['del'],  function (cb) {
  
   pump([
      gulp.src(['../js/**/*.gif', '../js/**/*.png', '../js/**/*.jpg', '../js/**/*.svg']),
      imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 7}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})
      ]),
      notify(function(file){ msglog('IMGCompress: ', file); }),
      gulp.dest('../dist/js')
     ],
     cb
   );
 });

 gulp.task('copy', ['del'], function (cb) {
  
   pump([
       gulp.src(['../js/**/*.tpl', '../js/**/*.ttf', '../js/**/*.woff', '../js/**/*.json']),
       notify(function(file){ msglog('Copy: ', file); }),
       gulp.dest('../dist/js')
     ],
     cb
   );
 });

//  gulp.task('default',['img-compress']);
gulp.task('default',['del', 'js-compress', 'css-compress', 'img-compress', 'copy']);