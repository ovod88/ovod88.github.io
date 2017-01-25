'use strict';

let request = require('request');

module.exports = function(location) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?appid=eed1a1d0420ae7da1990f28235b83b8c&q='
        + encodeURIComponent(location) + '&units=metric';

    return new Promise(function(resolve, reject) {
        if(!location) {
            return reject('No location');
        }
        request({
                url: url,
                json: true
            },function(error, response, body) {
                if (error) {
                    reject('Unable to fetch weather --> ' + error);
                } else {
                    resolve('Curernt temp: ' + body.main.temp + ' in ' + body.name);
                }
            }
        );
    })
};
