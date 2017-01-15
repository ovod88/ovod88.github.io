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


require(['jquery', '../js/scripts/initImages'], function($, initImages) {
    $(function() {
        //console.log(window.innerWidth);//TODO add condition for slider if mobile
        let categories = [{'sport' : 'Sport and Activity'}, {'health': 'Wellness and Health'},
            {'extreme': 'Extreme Sports and Expeditions'}, {'games': 'Games'},
            {'culture': 'Culture and Education'}, {'relaxation': 'Relaxation'}, {'travelling': 'Travelling'}];

        initImages(categories);
        //TODO add listener to the button
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

