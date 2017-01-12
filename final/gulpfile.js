'use strict';

const gulp = require('gulp');
const compass = require('gulp-compass');
//const sass = require('gulp-sass');
const debug = require('gulp-debug');
//const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const cached = require('gulp-cached');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer'),
    sprite = require('gulp.spritesmith');
//const watch = require('gulp-watch');
const remember = require('gulp-remember');
const imagemin = require('gulp-image');
const browserSync = require('browser-sync').create();
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('compass', function() {//TODO Now this task takes 2s to complete
    return gulp.src('css/src/core.scss')
        //.pipe(cached('scss'))
        .pipe(debug({title: 'SCSS'}))
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: isDevelopment,//NODE_ENV=production gulp compass will not create source maps
            css: 'css/dist',
            sass: 'css/src'
        }))
        //.pipe(remember('scss'))
        .pipe(gulp.dest('css/dist'));
        //.pipe(debug({title: 'COMPASS'}))
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src(['img/dist/icons/*.*', '!img/dist/icons/icons.png'], {since: gulp.lastRun('sprite')})
            .pipe(debug({title: 'SPRITE'}))
            .pipe(remember('sprite'))
            .pipe(sprite({
                imgName: 'icons.png',
                imgPath: '../../img/dist/icons/icons.png',
                cssName: '_sprite-icons.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 1,
                cssVarMap: function(sprite) {
                    var temparray = sprite.name.split('_'),
                        tempName = temparray[0].toLowerCase();

                    if(tempName.indexOf('partner') != -1) {
                        sprite.name = 'partner__view_icon_picture--' + tempName;
                    } else {
                        sprite.name = 'footer_logo_' + tempName;
                    }
                }
            }));

    spriteData.img.pipe(gulp.dest('img/dist/icons/'));
    spriteData.css.pipe(gulp.dest('css/src/'));

    return spriteData;
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

gulp.task('cleanAll', function() {
   return del(['css/dist', 'img/dist']);
});

gulp.task('cleanCSS', function() {
    return del(['css/dist']);
});

gulp.task('watch',function() {
    gulp.watch('css/src/**/*.*', gulp.series('compass'));
        //.on('unlink', function (filepath) {
            //remember.forget('scss', path.resolve(filepath));
            //delete cached.caches.scss[path.resolve(filepath)];
        //});
});

gulp.task('browser-sync', function() {
    browserSync.init({
       server: {
           baseDir: './'//IF NO BACKEND SERVER AVAILABLE
       }
    });

    browserSync.watch(['css/dist/*.*', 'img/dist/**/*.*']).on('change', browserSync.reload);
});

gulp.task('build', gulp.series('cleanAll', 'make-img-prod', 'sprite', 'compass'));//gulp.parallel(task1, task2)

gulp.task('dev', gulp.series('cleanCSS', 'compass', gulp.parallel('watch', 'browser-sync')));

gulp.task('default',gulp.series('compass'));