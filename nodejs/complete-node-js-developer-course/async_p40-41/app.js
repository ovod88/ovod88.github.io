'use strict';

let weather = require('./weather'),
    location = require('./location');
let args = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        describe: 'Location to fetch weather for',
        type: 'string'
    })
    .help('help')
    .argv;

let cityName = args.l;

if(cityName && cityName.length) {
    weather(cityName, function (currentWeather) {
        console.log(currentWeather);
    });
} else {
    location(function(locationJson) {
        if(!locationJson) {
            console.log('Unable to guess location');
            return;
        }
        weather(locationJson.city, function (currentWeather) {
            console.log(currentWeather);
        });
    });

}
