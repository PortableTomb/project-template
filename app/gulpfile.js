const gulp = require('gulp'),
      pug = require('gulp-pug'),
      data = require('gulp-data'),
      merge = require('gulp-merge-json'),
      fs = require('fs'),
      path = require('path')
      autoprefixer = require('autoprefixer')
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      postcss = require('gulp-postcss'),
      cssnext = require('postcss-cssnext'),
      cssnano = require('cssnano'),
      browsersync = require('browser-sync').create();

// HTML
// pug:data
 const options = {
   data: 'data.json'
 }
 gulp.task('pug:data', function() {
   return  gulp.src('data/**/*.json')
     .pipe(merge())
     .pipe(gulp.dest('./data/src'));
 });

// pug:html
 gulp.task('pug:html', function buildHTML() {
   return gulp.src('./src/views/**/*.pug')
   .pipe(data(function() {
         return require('./data/src/combined.json');
       }))
   .pipe(pug({
     pretty: true,
     basedir: './'
   }))
   .pipe(gulp.dest('./dist'));
 });

 // CSS
 // postcss
 gulp.task('styles', function() {
  return gulp.src('./src/styles/postcss/*.css')
    .pipe(concat('style.css'))
    .pipe(postcss([
      cssnext(),
      cssnano({ autoprefixer: false })
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe( browsersync.stream() );
});

// browsersync
gulp.task('browsersync', function() {
  browsersync.init(null, {
    server: {
      baseDir : './dist'
    }
  });
});

// JS

// watch
 gulp.task('watch', function() {
   gulp.watch('./src/views/**/*.pug', gulp.series('pug:html')).on('change', browsersync.reload);
   gulp.watch('./src/styles/postcss/*.css', gulp.series('styles')).on('change', browsersync.reload);
 });

 // default
gulp.task('build', gulp.parallel('watch', 'pug:data', 'pug:html', 'styles','browsersync'));
