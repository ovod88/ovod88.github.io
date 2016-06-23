var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

gulp.task('sass', function() {
    return gulp.src('styles/src/core.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/dist/'));
});

gulp.task('concatCss', ['sass'], function () {
    return gulp.src(['styles/dist/reset.css', 'styles/dist/core.css' ])
        .pipe(concatCss("styles/dist/style.css"))
        .pipe(gulp.dest('./'));
});

gulp.task('watch-sass',function() {
    return gulp.watch('styles/src/*.scss',['sass', 'concatCss']);
});

gulp.task('default',['sass', 'concatCss']);