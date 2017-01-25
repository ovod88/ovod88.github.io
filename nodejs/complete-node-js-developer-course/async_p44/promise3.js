'use strict';

let args = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        describe: 'Location to fetch weather for',
        type: 'string'
    })
    .help('help')
    .argv,
    cityName = args.l,
    getWeather = require('./weather'),
    getLocation = require('./location');

if(cityName && cityName.length) {
    getWeather(cityName).then(function(currentWeather) {
        console.log(currentWeather)
    },
    function(error) {
        console.log(error);
    })
} else {
    getLocation().then(function(location) {
        return getWeather(location.city);
    }, function (error) {
        console.log(error);
    }).
        then(function (currentWeather) {
            console.log(currentWeather);
    }).catch(function(error) {
        console.log(error);
    })
}