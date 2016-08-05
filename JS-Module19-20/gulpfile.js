var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var sprite = require('gulp.spritesmith');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

gulp.task('sass', function() {
    return gulp.src('styles/src/core.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/dist/'));
});

gulp.task('concatCss', ['sass'], function () {
    return gulp.src(['styles/dist/reset.css', 'styles/dist/bootstrap.css', 'styles/dist/core.css' ])
        .pipe(concatCss("styles/dist/style.min.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./'));
});

gulp.task('watch-sass',function() {
    return gulp.watch('styles/src/*.scss',['sass', 'concatCss']);
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('img/src/*.*')
            .pipe(sprite({
                imgName: 'icons.png',
                cssName: '_sprite-icons.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 1,
                cssVarMap: function(sprite) {
                    var temparray = sprite.name.split('-');

                    if(temparray[1] == 'blue') {
                        sprite.name = temparray[0] + ':hover';
                    } else {
                        sprite.name = temparray[0];
                    }
                },
                cssOpts: {
                    cssSelector: function (sprite) {
                        return '.' + sprite.name;
                    }
                }
            }));

    spriteData.img.pipe(gulp.dest('img/sprite-dist/'));
    spriteData.css.pipe(gulp.dest('styles/src/'));
});


gulp.task('default',['sass', 'concatCss']);