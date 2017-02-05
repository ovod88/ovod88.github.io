const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;


module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.newer(options.dst))
            .pipe($.if(function(file) {
                    return !!file.relative.indexOf('libs');
                },
                combine(
                    $.debug({title: 'babeling'}),
                    $.babel({
                        presets: ['es2015']
                    })
                ),
                $.debug({title: 'copying'})
            ))
            .pipe(gulp.dest(options.dst));
    }
};
