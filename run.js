'use strict';

var API_VERSION = 'v1';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

var getCountry = require('./data/getCountry');
var getCity = require('./data/getCity');
var getCityWeather = require('./data/getCityWeather');

var app = express();
var api = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('build'));

router
    .get('/', function (req, res) { res.json({ message: 'hooray! welcome to our api!' }); })
    .get('/country', getCountry)
    .get('/country/:country', getCity)
    .get('/:city', getCityWeather);

api.use(router);
app.use('/api/' + API_VERSION, api);
app.all('*', function (req, res) {
    fs.readFile(__dirname + '/build/index.html', 'utf8', function (err, html) {
        res.send(html);
    });
});

app.listen(3000);