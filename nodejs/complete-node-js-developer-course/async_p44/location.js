'use strict';
let request = require('request');
let url = 'http://ipinfo.io';

module.exports = function() {

    return new Promise(function(resolve, reject) {
        request({
                url: url,
                json: true
            }, function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            }
        );
    })
};
