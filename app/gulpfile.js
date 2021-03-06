const gulp = require('gulp'),
      pug = require('gulp-pug'),
      data = require('gulp-data'),
      merge = require('gulp-merge-json'),
      fs = require('fs'),
      path = require('path'),
      imagemin = require('gulp-imagemin'),
      deploy = require('gulp-gh-pages'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      postcss = require('gulp-postcss'),
      cssnext = require('postcss-cssnext'),
      cssnano = require('cssnano'),
      cssnesting = require('postcss-nesting'),
      browsersync = require('browser-sync').create(),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      babelify = require('babelify'),
      babel = require('babel-core')
      sourcemaps = require('gulp-sourcemaps')
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      beeper = require('beeper'),
      del = require('del'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

// PUG
// pug:data
 const options = {
   data: 'data.json'
 }
 gulp.task('pug:data', function() {
   return  gulp.src('data/**/*.json')
   .pipe(merge())
   .pipe(gulp.dest('./dist/data/src'))
   .pipe( browsersync.stream() );
 });

// pug:html
 gulp.task('pug:html', function buildHTML() {
   return gulp.src('./src/views/**/*.pug')
   .pipe(data(function(file) {
         // return require('./data/src/combined.json');
         return JSON.parse(
            fs.readFileSync('./dist/data/src/combined.json')
          );
       }))
   .pipe(pug({
     pretty: true,
     basedir: './'
   }))
   .pipe(concat('index.html'))
   .pipe(gulp.dest('./dist'))
   .pipe( browsersync.stream() );
 });

 // POSTCSS
 // styles
 // error handling
 function onError(error) {
   beeper();
 }

 gulp.task('styles', function() {
  return gulp.src('./src/styles/postcss/*.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('style.css'))
    .pipe(postcss([
      cssnesting({}),
      cssnext({ browsers: ['last 2 versions'] }),
      cssnano({ autoprefixer: false })
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe( browsersync.stream() );
});

// sass
gulp.task('sass', function () {
 return gulp.src('./src/styles/sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
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

// JAVASCRIPTS
// scripts
gulp.task('scripts', function(){
  return gulp.src('./src/scripts/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./src/scripts/concat/'));
});

// browserify
gulp.task('browserify', function() {
  var b = browserify({
    entries: './src/scripts/concat/bundle.js',
    debug: true
  });

  return b.transform('babelify', {
        presets: ['env']
    }).bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: false
    }))
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));
});

//images
gulp.task('images', function() {
  return gulp.src(['./src/assets/img/**/*','./src/assets/svg/*'])
  .pipe(imagemin([
    imagemin.svgo({
		plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
		]
	})
  ]))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
})

// watch
 gulp.task('watch', function() {
   gulp.watch('./src/views/**/*.pug', gulp.series(['pug:html'])).on('change', browsersync.reload);
   gulp.watch('./src/styles/sass/**/*.scss', gulp.series('sass')).on('change', browsersync.reload);
   gulp.watch('./src/scripts/*.js', gulp.series('scripts')).on('change', browsersync.reload);
 });

// clean
gulp.task('clean', function(){
  return del(['./data/src/combined.json', './dist/img/svg/sprite.svg', './dist/css/styles.css', './dist/js/bundle.js'])
})

// async completion
gulp.task('message', function(done) {
  console.log("gulp be done");
  done();
});

// build
gulp.task('build', gulp.parallel('pug:html','images', 'sass', 'scripts', 'watch', 'browsersync', 'browserify', 'message'));

// default
gulp.task('default', gulp.series(['clean','pug:data','build']));
