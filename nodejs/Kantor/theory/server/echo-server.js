var http = require('http');
var url = require('url');

var server = new http.Server(function(reg, res) {
    console.log(reg.method, reg.url);

    var urlParsed = url.parse(reg.url, true);
    debugger;

    if(urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.setHeader('Cache-control', 'no-cache');
        res.end(urlParsed.query.message);
    } else {
        res.statusCode  = 404;
        res.end('Page not found');
    }

});

server.listen('1337', '127.0.0.1');
console.log('Server launched!');
