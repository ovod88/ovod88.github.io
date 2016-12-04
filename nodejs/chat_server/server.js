var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, resp) {
    console.log('URL  ', req.url);
    switch (req.url)  {
        case '/':
            sendFile('index.html', resp);
            break;
        case '/subscribe':
            chat.subscribe(req,resp);
            break;
        case '/publish':
            var body = '';
            req.on('readable', function () {
               body += req.read();

                if(body.length > 1e4) {
                    resp.statusCode = 413;
                    resp.end('Your message is too big');
                }
            }).on('end', function() {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    resp.statusCode = 400;
                    resp.end('Bad request');
                    return;
                }

                chat.publish(body.message);
                resp.end('ok');
            });
            break;
        default:
            resp.statusCode = 404;
            resp.end('Not found');
    }
}).listen(3000);

function sendFile(file, resp) {
    var fileStream = new fs.ReadStream(file);
    fileStream.pipe(resp);

    fileStream.on('error', function() {
        resp.statusCode = 500;
        resp.end('Server error');
    })
}
