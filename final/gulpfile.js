'use strict';

const fs = require('fs');
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
//const retinize = require('gulp-retinize');
const imagemin = require('gulp-image');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const through2 = require('through2').obj;
const File = require('vinyl');
const eslint = require('gulp-eslint');
const combine = require('stream-combiner2').obj;
const babel = require('gulp-babel');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('compass', function() {//TODO Now this task takes 2s to complete
    return gulp.src('css/src/core.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Compass compilation',
                    message: err.message
                };
            })
        }))
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: isDevelopment,//NODE_ENV=production gulp compass will not create source maps
            css: 'css/dist',
            sass: 'css/src'
        }))
        .pipe(gulp.dest('css/dist'));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src(['img/dist/icons/*.*', '!img/dist/icons/icons.png'], {since: gulp.lastRun('sprite')})
            .pipe(plumber({
                errorHandler: notify.onError(function(err) {
                    return {
                        title: 'Sprite compilation',
                        message: err.message
                    };
                })
            }))
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

gulp.task('js', function() {
    return gulp.src('js/src/**/*.*')
        .pipe(newer('js/dist'))
        .pipe(gulpif(function(file) {
                return !!file.relative.indexOf('libs');
            },
            combine(
                debug({title: 'babeling'}),
                babel({
                    presets: ['es2015']
                })
            )
        ))
        .pipe(gulp.dest('js/dist'));
});

gulp.task('lint', function() {
    let errorMessage = '',
        esLintResults = {},
        esLintCacheFile = process.cwd() + '/LintCache.json';

    try {
        esLintResults = JSON.parse(fs.readFileSync(esLintCacheFile));
    } catch(e) {
    }

    return gulp.src(['js/**/*.js', '!js/libs/**/*'], {read: false})
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'JS lint checking',
                    message: err.message
                };
            })
        }))
        .pipe(gulpif(function(file) {
            return esLintResults[file.path] && esLintResults[file.path].mtime == file.stat.mtime.toJSON();
        },
        through2(function(file, enc, callback) {
            file.eslint = esLintResults[file.path].eslint;
            callback(null, file);
        }),
        combine(
            through2(function(file, enc, callback) {
                file.contents = fs.readFileSync(file.path);
                callback(null, file);
            }),
            eslint(),
            debug({title: 'eslinting'}),
            through2(function(file, enc, callback) {
                esLintResults[file.path] = {
                    eslint: file.eslint,
                    mtime: file.stat.mtime
                };
                callback(null, file);
            })
        )))
        .pipe(through2(function(file, enc, callback) {
            if(file.eslint.errorCount) {
                errorMessage += `Lint detected ${file.eslint.errorCount} errors in ${file.relative}\n`;
            }
            callback(null, file);
        },
         function(callback) {
             if(errorMessage.length) {
                 this.emit('error', new Error(errorMessage));
             }
             callback();
         }))
        .pipe(eslint.format())
        .on('end', function() {
            fs.writeFileSync(esLintCacheFile, JSON.stringify(esLintResults));
        })
});

gulp.task('make-img-prod', function () {

    let mtimes = {};

   return gulp.src('img/src/**/*.{png,jpeg,jpg}', {since: gulp.lastRun('make-img-prod')})
       .on("data", function(file){
           console.log(file.relative);
           // here you can filter all your file depends on name/path/etc.
       })
       .pipe(plumber({
           errorHandler: notify.onError(function(err) {
               return {
                   title: 'Image minifying and coping',
                   message: err.message
               };
           })
       }))
       .pipe(newer('img/dist'))
       .pipe(imagemin())
       .pipe(debug({title: 'copying images to production'}))
       .pipe(through2(
           function(file, enc, callback) {
               mtimes[file.relative] = file.stat.mtime;
               callback(null, file);
           }, function (callback) {
               let manifest = new File({
                   contents: new Buffer(JSON.stringify(mtimes)),
                   base: process.cwd(),
                   path: process.cwd() + '/manifest_img.json'
               });
               manifest.isManifest = true;
               this.push(manifest);
               callback();
           }
       ))
       .pipe(gulp.dest(function (file) {
           if(file.isManifest) {
               return process.cwd();
           } else {
               return 'img/dist';
           }
       }));
});

gulp.task('cleanAll', function() {
   return del(['css/dist', 'img/dist']);
});

gulp.task('cleanImg', function() {
    return del(['img/dist']);
});

gulp.task('cleanCSS', function() {
    return del(['css/dist']);
});

gulp.task('watch',function() {
    gulp.watch('css/src/**/*.*', gulp.series('compass'));
    gulp.watch(['js/src/**/*.js', '!js/src/libs/**/*'], gulp.series('lint', 'js'));
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