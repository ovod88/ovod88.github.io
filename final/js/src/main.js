requirejs.config ({
    baseUrl: 'bower_components',
    waitSeconds: 200,
    paths: {
        'jquery': 'jquery/dist/jquery',
        'lodash': '../js/dist/libs/lodash',
        'jquery.masonry': 'masonry/masonry',//TODO version 3 for IE8,
        'jquery.bridget': 'jquery-bridget/jquery-bridget',
        'Modernizr':'../js/dist/libs/modernizr-custom',
        'globals': '../js/dist/scripts/globals',
        'images': '../js/dist/scripts/loadImages',
        'masonry': '../js/dist/scripts/initMasonry'
    },
    shim: {
        'Modernizr': {
            exports: 'Modernizr'
        }
    }
});


require(['globals' ,'jquery', 'images'], function(globals, $, loadImages) {
    $(function() {
        //console.log(window.innerWidth);//TODO add condition for slider if mobile
        let categories = [{'sport' : 'Sport and Activity'}, {'health': 'Wellness and Health'},
            {'extreme': 'Extreme Sports and Expeditions'}, {'games': 'Games'},
            {'culture': 'Culture and Education'}, {'relaxation': 'Relaxation'}, {'travelling': 'Travelling'}];

        loadImages(categories);

        $('.discover_holiday_search_box__link').on('click', function(e) {
            let $this = $('.discover_holiday_search_box__input');
            e.preventDefault();

            if($this.val()) {
                loadImages($this.val());
            }
            $this.val('');
        });
    });
});