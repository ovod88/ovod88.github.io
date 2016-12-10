var db = require('db');
var User = require('./user/index');
var logger = require('./logger')(module);


function run() {
    var vasya = new User("Vasia");
    var petya = new User("Petia");

    vasya.hello(petya);
    logger(db.getPhrase('load'));
}

if(module.parent) {
    exports.run = run;
} else {
    run();
}