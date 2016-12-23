var db = require('db');
var logger = require('../logger')(module);
//module.exports - object
//exports = this - link to module.exports
db.connect();

function User(name) {
    this.name = name;
}

User.prototype.hello = function(who) {
    logger(db.getPhrase('Hello'), who.name);
};

module.exports = User;
