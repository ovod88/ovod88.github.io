'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const fs = require('fs');
const through2 = require('through2').obj;
const combine = require('stream-combiner2').obj;

module.exports = function(options) {
    let errorMessage = '',
        esLintResults = {},
        esLintCacheFile = process.cwd() + '/LintCache.json';

    try {
        esLintResults = JSON.parse(fs.readFileSync(esLintCacheFile));
    } catch(e) {
    }

    return function() {
        return gulp.src(options.src, {read: false})
            .pipe($.plumber({
                errorHandler: $.notify.onError(function(err) {
                    return {
                        title: 'JS lint checking',
                        message: err.message
                    };
                })
            }))
            .pipe($.if(function(file) {
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
                    $.eslint(),
                    $.debug({title: 'eslinting'}),
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
            .pipe($.eslint.format())
            .on('end', function() {
                fs.writeFileSync(esLintCacheFile, JSON.stringify(esLintResults));
            })
    }

};
