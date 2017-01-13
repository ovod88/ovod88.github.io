'use strict';

let express = require('express'),
    app = express(),
    bodyparser = require('body-parser');

let urlencodedParser = bodyparser.urlencoded({ extended: false}),
    jsonParser = bodyparser.json();

app.use('/css', express.static(__dirname + '/public'));

app.use('/', function(req, resp, next) {
    console.log('Request url: ', req.url);
    next();
});

app.set('view engine', 'ejs');

app.get('/', function(req, resp) {
    resp.render('form');
});

app.post('/person', urlencodedParser, function(req, resp) {
    resp.send('Thank you!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

app.post('/personjson', jsonParser, function(req, resp) {
    resp.send('Thank you for JSON!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});


app.get('/index/:id', function (req, res) {
    res.render('index', { ID: req.params.id });
});

app.get('/api', function(req, resp) {
    resp.json({"name": "vova"});
});

app.get('/person/:id', function(req, resp) {
    resp.send(`You sent number ${req.params.id}`);
});

app.listen(3000);