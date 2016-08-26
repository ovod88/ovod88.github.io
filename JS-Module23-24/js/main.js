requirejs.config({
    baseUrl: "js/app",
    paths: {
        resig: '../libs/tmpl',
        jquery: '../libs/jquery.min'
    },
    shim: {
        'resig': {
            exports: 'tmpl'
        }
    }
});



require(['jquery', 'models/Modelul', 'views/View1' ,'controllers/Controller1'], function($, Model_UL, View1, Controller1) {
    $(document).ready(function() {
        var model_ul = new Model_UL(['Water is the best', 'Cidr is the best', 'Sport is the best']);
        var view = new View1(model_ul);
        var controller = new Controller1(model_ul, view);
    });
});
