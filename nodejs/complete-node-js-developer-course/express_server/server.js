var express = require('express'),
    app = express(),
    PORT = 3000;

var middleWare = require('./middleWare');

app.use(middleWare.logger);

app.get('/about', middleWare.requireAuthentication, function (req, resp) {
   resp.send('About us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
    console.log('Server started at ' + PORT);
});