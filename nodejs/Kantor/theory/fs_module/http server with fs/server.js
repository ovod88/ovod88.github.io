var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '\\public';


http.createServer(function(req, resp) {
    if(!checkAccess(req)) {
        resp.status = 403;
        resp.end('Tell me secret to access!');
        return;
    }
    sendFileSafe(url.parse(req.url).pathname, resp);
}).listen(3000);

function checkAccess(req) {
    return url.parse(req.url, true).query.secret == 'O_o';
}

function sendFileSafe(filepath, resp) {
    try {
        filepath = decodeURIComponent(filepath);//check if url is correct
    } catch (e) {
        resp.status = 400;
        resp.end('Bad request');
        return;
    }

    if(~filepath.indexOf('\0')) {//if indexOf returns -1 (no symbol), ~-1 is 0
        resp.status = 400;
        resp.end('Bad request');
        return;
    }

    filepath = path.normalize(path.join(ROOT, filepath));

    if(filepath.indexOf(ROOT) != 0) {//check if full path starts with ROOT directory
        resp.status = 404;
        resp.end('File not found');
        return;
    }

    fs.stat(filepath, function (err, stats) {
        if(err || !stats.isFile()) {
            resp.status = 404;
            resp.end('File not found');
        }
    });

    sendFile(filepath, resp);
}

function sendFile(file, resp) {
    //fs.readFile(file, function (err, data) {
    //    if(err) throw err;
    //
    //    var mime = require('mime').lookup(file);
    //    resp.setHeader('Content-Type', mime + ';charset=utf-8');
    //    resp.end(data);
    //})
    var stream = new fs.ReadStream(file);
    //
    //stream.on('readable', write);
    //
    //function write() {
    //    var fileContent = stream.read();
    //
    //    if(fileContent && !resp.write(fileContent)) {
    //        stream.removeListener('readable', write);
    //
    //        resp.once('drain', function() {
    //            file.on('readable', write);
    //            write();
    //        })
    //    }
    //}
    //
    //stream.on('end', function() {
    //    resp.end();
    //});
    //
    //stream.on('error', function(err) {//process errors
    //   if(err.code == 'ENOENT') {
    //       console.log('No file found');
    //   } else {
    //       console.log(err);
    //   }
    //})

    stream.pipe(resp);
}

