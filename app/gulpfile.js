const  gulp = require('gulp'),
       pug = require('gulp-pug'),
       data = require('gulp-data'),
       merge = require('gulp-merge-json'),
       fs = require('fs'),
       path = require('path');

 const options = {
   data: 'data.json'
 }

 gulp.task('pug:data', function() {
   return  gulp.src('data/**/*.json')
     .pipe(merge())
     .pipe(gulp.dest('./data/src'));
 });

 gulp.task('html', function buildHTML() {
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

// 
 gulp.task('watch', function() {
   gulp.watch('./src/views/**/*.pug', gulp.series('html'));
 });

 // default
gulp.task('build', gulp.parallel('pug:data', 'html', 'watch'));
