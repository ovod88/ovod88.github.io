'use strict';
let request = require('request');

function getWeather(location) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?appid=eed1a1d0420ae7da1990f28235b83b8c&q='
        + encodeURIComponent(location) + '&units=metric';

    let promise = new Promise(function(resolve, reject) {
        if(!location) {
            reject('No location provided');
        }

        request({
                url: url,
                json: true
            },function(error, response, body) {
                if (error) {
                    reject('No location provided' + error);
                } else {
                    resolve('Curernt temp: ' + body.main.temp + ' in ' + body.name);
                }
            }
        );
    });
    return promise;
}

getWeather('San Fran').then(function (currentWeather) {
    console.log('MAMA ' + currentWeather);
}, function (error) {
    console.log('MAMA ' + error);
});
