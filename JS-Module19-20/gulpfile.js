var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var sprite = require('gulp.spritesmith');

gulp.task('sass', function() {
    return gulp.src('styles/src/core.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/dist/'));
});

gulp.task('concatCss', ['sass'], function () {
    return gulp.src(['styles/dist/reset.css', 'styles/dist/bootstrap.css', 'styles/dist/core.css' ])
        .pipe(concatCss("styles/dist/style.css"))
        .pipe(gulp.dest('./'));
});

gulp.task('watch-sass',function() {
    return gulp.watch('styles/src/*.scss',['sass', 'concatCss']);
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('img/sprite-social-src/*.*')
            .pipe(sprite({
                imgName: 'img/sprite-social-dist/social-icons.png',
                cssName: '_sprite-social-icons.scss',
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

    spriteData.img.pipe(gulp.dest('img/sprite-social-dist/'));
    spriteData.css.pipe(gulp.dest('styles/src/'));
});


gulp.task('default',['sass', 'concatCss']);