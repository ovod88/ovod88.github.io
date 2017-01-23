'use strict';
let express = require('express');
let app = express();

let port = process.env.PORT || 3000;
let serverPeople = [
    {name: 'Vova'},
    {name: 'Lina'},
    {name: 'Petia'}
];

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {

    res.render('index', {serverPeople: serverPeople});

});

app.listen(port);