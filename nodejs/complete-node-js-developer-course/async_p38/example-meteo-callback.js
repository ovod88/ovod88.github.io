'use strict';

let weather = require('./weather');

weather(function (currentWeather) {
    console.log(currentWeather);
});
