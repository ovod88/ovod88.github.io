'use strict';

const gulp = require('gulp');
const compass = require('gulp-compass');
const debug = require('gulp-debug');
//const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const cached = require('gulp-cached');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
//const watch = require('gulp-watch');
const remember = require('gulp-remember');
const imagemin = require('gulp-image');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('compass', function() {//TODO Now this task takes 2s to complete
    return gulp.src('css/src/core.scss',{since: gulp.lastRun('compass')})
        //.pipe(cached('scss'))
        //.pipe(debug({title: 'SCSS'}))
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: isDevelopment,//NODE_ENV=production gulp compass will not create source maps
            css: 'css/dist',
            sass: 'css/src'
        })).
        pipe(autoprefixer())
        //.pipe(remember('scss'))
        .pipe(gulp.dest('css/dist'));
        //.pipe(debug({title: 'COMPASS'}))
});

gulp.task('make-img-prod', function () {
   return gulp.src('img/src/**/*.{png,jpeg,jpg}', {since: gulp.lastRun('make-img-prod')})
       .on("data", function(file){
           console.log(file.relative);
           // here you can filter all your file depends on name/path/etc.
       })
       .pipe(newer('img/dist'))
       .pipe(imagemin())
       .pipe(debug({title: 'copying images to production'}))
       .pipe(gulp.dest('img/dist'));
});

gulp.task('clean', function() {
   return del(['css/dist', 'img/dist']);
});

gulp.task('watch',function() {
    gulp.watch('css/src/**/*.*', gulp.series('compass'));
        //.on('unlink', function (filepath) {
            //remember.forget('scss', path.resolve(filepath));
            //delete cached.caches.scss[path.resolve(filepath)];
        //});
});

gulp.task('build', gulp.series('clean', gulp.parallel('compass', 'make-img-prod')));//gulp.parallel(task1, task2)

gulp.task('default',gulp.series('compass'));