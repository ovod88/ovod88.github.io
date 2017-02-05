'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const requireJsConfig = require('./requireJSOptimizerConfig');
const path = require('path');

module.exports = function(options) {
    let path = options.src.split('/'),
        name = path[path.length - 1];

    return function () {
        return gulp.src(options.src)
            .pipe($.requirejsOptimize(requireJsConfig))
            .pipe($.debug({title: 'require-optimiser'}))
            .pipe($.rename(name.split('.')[0] + '-opt.js'))
            .pipe(gulp.dest(options.dst));
    };
};
