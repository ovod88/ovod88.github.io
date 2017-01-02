var EventEmitter = require('events');
var util = require('util');

function GreetingGr() {
    this.greeting = 'Hello world';
}

util.inherits(GreetingGr, EventEmitter);

GreetingGr.prototype.greet = function () {
    console.log(this.greeting);
    this.emit('greet');
};

var greeter1 = new GreetingGr();
greeter1.on('greet', function() {
   console.log('GREET IS CALLED');
});
greeter1.greet();
