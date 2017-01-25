'use strict';

let request = require('request'), url;

module.exports = function(location, callback) {
    url = 'http://api.openweathermap.org/data/2.5/weather?appid=eed1a1d0420ae7da1990f28235b83b8c&q='
        + encodeURIComponent(location) + '&units=metric';
    if(!location) {
        return callback('No location');
    }

    request({
                url: url,
                json: true
            },function(error, response, body) {
                if (error) {
                    callback('Unable to fetch weather --> ' + error);
                } else {
                    //callback(JSON.stringify(body, null, 4));
                    callback('Curernt temp: ' + body.main.temp + ' in ' + body.name);
                }
            }
        );
};
