const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
    return function() {
        return gulp.src(options.srcFile)
            .pipe($.plumber({
                errorHandler: $.notify.onError(function(err) {
                    return {
                        title: 'Compass compilation',
                        message: err.message
                    };
                })
            }))
            .pipe($.compass({
                config_file: options.confFile,
                sourcemap: isDevelopment,//NODE_ENV=production gulp compass will not create source maps
                css: options.dst,
                sass: options.src
            }))
            .pipe(gulp.dest(options.dst));
    }
};