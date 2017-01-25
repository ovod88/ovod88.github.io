'use strict';

let request = require('request');
let url = 'http://ipinfo.io';

module.exports = function(callback) {
    request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (error) {
                callback();
            } else {
                callback(body);
            }
        }
    );
};
