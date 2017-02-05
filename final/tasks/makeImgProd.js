'use strict';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const through2 = require('through2').obj;
const File = require('vinyl');

module.exports = function (options) {
    return function () {
        let mtimes = {};

        return gulp.src(options.srcFiles, {since: gulp.lastRun(options.taskname)})
            .on("data", function(file){
                console.log(file.relative);
                // here you can filter all your file depends on name/path/etc.
            })
            .pipe($.plumber({
                errorHandler: $.notify.onError(function(err) {
                    return {
                        title: 'Image minifying and coping',
                        message: err.message
                    };
                })
            }))
            .pipe($.newer(options.dstFolder))
            .pipe($.image())
            .pipe($.debug({title: 'copying images to production'}))
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
                    return options.dstFolder;
                }
            }));
    }
};
