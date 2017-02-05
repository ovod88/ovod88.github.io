const gulp = require('gulp');

const $ = require('gulp-load-plugins')();
const sprite = require('gulp.spritesmith');

module.exports = function(options) {
    return function () {
        var spriteData =
            gulp.src(options.srcFiles, {since: gulp.lastRun(options.taskname)})
                .pipe($.plumber({
                    errorHandler: $.notify.onError(function(err) {
                        return {
                            title: options.taskname + ' compilation',
                            message: err.message
                        };
                    })
                }))
                .pipe($.debug({title: options.taskname}))
                .pipe($.remember(options.taskname))
                .pipe(sprite({
                    imgName: 'icons.png',
                    imgPath: '../../img/dist/icons/icons.png',
                    cssName: '_sprite-icons.scss',
                    cssFormat: 'scss',
                    algorithm: 'binary-tree',
                    padding: 1,
                    cssVarMap: function(sprite) {
                        var temparray = sprite.name.split('_'),
                            tempName = temparray[0].toLowerCase();

                        if(tempName.indexOf('partner') != -1) {
                            sprite.name = 'partner__view_icon_picture--' + tempName;
                        } else {
                            sprite.name = 'footer_logo_' + tempName;
                        }
                    }
                }));

        spriteData.img.pipe(gulp.dest(options.imgDst));
        spriteData.css.pipe(gulp.dest(options.cssDst));

        return spriteData;
    }
};
