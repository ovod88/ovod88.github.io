'use strict';
const gulp = require('gulp');
const sprite = require('gulp.spritesmith');
const browserSync = require('browser-sync').create();


function lazyTaskRequest(taskName, path, options) {
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
      let task = require(path).call(this, options)  ;

        return task(callback);
    })
}

lazyTaskRequest('cleanJs', './tasks/cleanJs', {
   dst: 'js/dist'
});

lazyTaskRequest('cleanCSS', './tasks/cleanCss', {
    dst: 'css/dist'
});

lazyTaskRequest('cleanImg', './tasks/cleanImg', {
    dst: 'img/dist'
});

lazyTaskRequest('js', './tasks/copyJsToDist', {
    src: 'js/src/**/*.*',
    dst: 'js/dist'
});

lazyTaskRequest('js-optimize', './tasks/jsOptimize', {
    src: 'js/dist/main.js',
    dst: 'js/dist'
});

lazyTaskRequest('lint', './tasks/jsLint', {
    src: ['js/src/**/*.js', '!js/src/libs/**/*']
});

lazyTaskRequest('compass', './tasks/compass', {
    srcFile: 'css/src/core.scss',
    src: 'css/src',
    dst: 'css/dist',
    confFile: './config.rb'
});

lazyTaskRequest('sprite', './tasks/sprite', {
    taskname: 'sprite',
    srcFiles: ['img/dist/icons/*.*', '!img/dist/icons/icons.png'],
    imgDst: 'img/dist/icons/',
    cssDst: 'css/src/'
});

lazyTaskRequest('make-img-prod', './tasks/makeImgProd', {
    taskname: 'make-img-prod',
    srcFiles: 'img/src/**/*.{png,jpeg,jpg}',
    dstFolder: 'img/dist'
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

gulp.task('build-js', gulp.series('cleanJs', 'lint', 'js', 'js-optimize'));

gulp.task('cleanAll',  gulp.parallel('cleanJs', 'cleanCSS', 'cleanImg'));

gulp.task('build', gulp.series('cleanAll', 'make-img-prod', 'sprite', 'compass'));//gulp.parallel(task1, task2)

gulp.task('dev', gulp.series('cleanCSS', 'compass', gulp.parallel('watch', 'browser-sync')));

gulp.task('default',gulp.series('compass'));