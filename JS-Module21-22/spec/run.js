var page = require('webpage').create();
var fs = require('fs');
var index = '../index.html';

page.open(index, function(status) {
    if (status !== 'success') {
        console.log('Unable to load the index' + index);
        phantom.exit();
    } else {
        console.log('Loaded the index' + index);
        window.setTimeout(function() {
            page.injectJs('jquery-2.2.3.js');
            page.injectJs('jasmine.js');
            page.injectJs('console-runner.js');
            page.injectJs('spec.js');

            page.evaluate(function(){
                var console_reporter = new jasmine.ConsoleReporter();

                jasmine.getEnv().addReporter(console_reporter);
                jasmine.getEnv().execute();
            });
        }, 200);
    }
});
page.onConsoleMessage = function(msg) {
    if(msg === "ConsoleReporter finished") {
        phantom.exit();
    }
    return console.log(msg);
};