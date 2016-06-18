var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); 
var concatCss = require('gulp-concat-css');
var uglifyCss = require('gulp-minify-css'); 
 
gulp.task('javascript', function() {
  return gulp.src(['Google API/js/libs/lodash/.js', 'Google API/js/libs/*.js', 'Google API/js/src//script.js'])
      	.pipe(concat('script.min.js', {newLine: ';'}))
      	.pipe(uglify())
    	.pipe(gulp.dest('Google API/js/dist/'));
});

gulp.task('css', function () {
  return gulp.src('Google API/css/src/*.css')
    .pipe(concatCss('style.min.css'))
    .pipe(uglifyCss())
    .pipe(gulp.dest('Google API/css/dist/'));
});

gulp.task('default', ['javascript', 'css']);

