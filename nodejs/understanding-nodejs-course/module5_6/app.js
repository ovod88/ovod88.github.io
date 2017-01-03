'use strict';

var EventEmitter = require('events');
var util = require('util');


class GreetingGr extends EventEmitter {//ES6 syntax
    constructor() {
        super();
        this.greeting = 'Hello world';
    }

    greet(data) {
        console.log(`${ this.greeting }`);//ES6 syntax for method in prototype
        this.emit('greet', data);
    }
}

//function GreetingGr() {//ES5 syntax
//    EventEmitter.call(this);
//    this.greeting = 'Hello world';
//}
//util.inherits(GreetingGr, EventEmitter);

//GreetingGr.prototype.greet = function () {//ES5 syntax for method in prototype
//    console.log(this.greeting);
//    this.emit('greet');
//};

var greeter1 = new GreetingGr();
greeter1.on('greet', function(data) {
   console.log(`GREET IS CALLED ${ data }`);
});
greeter1.greet('MY DEAR');
