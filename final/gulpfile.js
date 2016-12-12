var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('compass', function() {
    gulp.src('css/src/core.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css/dist',
            sass: 'css/src'
        }))
});

gulp.task('watch-sass-files',function() {
    return gulp.watch(['css/src/**/*.scss', 'css/src/*.scss'],['compass']);
});

gulp.task('default',['compass']);