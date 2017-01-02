'use strict';

const gulp = require('gulp');
const compass = require('gulp-compass');
const debug = require('gulp-debug');
//const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('compass', function() {
    return gulp.src('css/src/core.scss')
        .pipe(debug({title: 'SCSS'}))
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: isDevelopment,//NODE_ENV=production gulp compass will not create source maps
            css: 'css/dist',
            sass: 'css/src'
        }));
        //.pipe(gulp.dest('css/dist'));
        //.pipe(debug({title: 'COMPASS'}))
});

gulp.task('copy-img-prod', function () {
   return gulp.src('img/src/**/*.{png,jpeg,jpg}', {since: gulp.lastRun('copy-img-prod')})
       .pipe(debug({title: 'copying images to production'}))
       .pipe(gulp.dest('img/dist'));
});

gulp.task('clean', function() {
   return del(['css/dist', 'img/dist']);
});

gulp.task('watch',function() {
    gulp.watch('css/src/**/*.*', gulp.series('compass'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('compass', 'copy-img-prod'),'watch'));//gulp.parallel(task1, task2)

gulp.task('default',gulp.series('compass'));