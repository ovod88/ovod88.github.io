var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('styles/src/core.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/dist/'));
});

gulp.task('watch-sass',function() {
    gulp.watch('styles/src/*.scss',['sass']);
});