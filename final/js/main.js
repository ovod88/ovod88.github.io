'use strict';

requirejs.config ({
    baseUrl: 'bower_components',
    waitSeconds: 200,
    paths: {
        'jquery': 'jquery/dist/jquery',
        'lodash': '../js/libs/lodash',
        'jquery.masonry': 'masonry/masonry',//TODO version 3 for IE8,
        'jquery.bridget': 'jquery-bridget/jquery-bridget'
    }
});


require(['../js/scripts/globals' ,'jquery', '../js/scripts/loadImages'], function(globals, $, loadImages) {
    $(function() {
        //console.log(window.innerWidth);//TODO add condition for slider if mobile
        let categories = [{'sport' : 'Sport and Activity'}, {'health': 'Wellness and Health'},
            {'extreme': 'Extreme Sports and Expeditions'}, {'games': 'Games'},
            {'culture': 'Culture and Education'}, {'relaxation': 'Relaxation'}, {'travelling': 'Travelling'}];

        loadImages(categories);
        console.log('PAGE  LOADED ' + new Date().toString());

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
















//requirejs.config({
//    baseUrl: "js/app",
//    paths: {
//        resig: '../libs/tmpl',
//        jquery: '../libs/jquery.min'
//    },
//    shim: {
//        'resig': {
//            exports: 'tmpl'
//        }
//    }
//});
//
//
//
//require(['jquery', 'models/Modelul', 'views/View1' ,'controllers/Controller1'], function($, Model_UL, View1, Controller1) {
//    $(document).ready(function() {
//        var model_ul = new Model_UL(['Water is the best', 'Cidr is the best', 'Sport is the best']);
//        var view = new View1(model_ul);
//        var controller = new Controller1(model_ul, view);
//    });
//});

