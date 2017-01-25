'use strict';

let request = require('request');
let args = require('yargs')
    .usage('Usage: $0 -c [city]')
    .demandOption(['c'])
    .argv;
let cityName = args.c,
    url = '';
if(typeof cityName === 'string' && cityName.length) {
    url = 'http://api.openweathermap.org/data/2.5/weather?appid=eed1a1d0420ae7da1990f28235b83b8c&q='
        + cityName + '&units=metric';
}

module.exports = function(callback) {
    request({
                url: url,
                json: true
            },function(error, response, body) {
                if (error) {
                    callback('Unable to fetch weather --> ' + error);
                } else {
                    callback(JSON.stringify(body, null, 4));
                    callback('Curernt temp: ' + body.main.temp + ' in ' + body.name);
                }
            }
        );
};
