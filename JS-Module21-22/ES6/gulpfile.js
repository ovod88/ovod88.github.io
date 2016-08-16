var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
    return gulp.src(['js/src/Test.js', 'js/src/Main.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js/dist'));
});

gulp.task('watch-babel',function() {
    return gulp.watch('js/src/*.js',['default']);
});

