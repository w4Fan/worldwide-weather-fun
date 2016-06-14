var http = require('http');
var format = require('../utils/format');
var key = '0eb4bfab5fd35b38dc0fd345b40d0bb0';

var getCityWeather = function (req, res) {
    var cid = req.params.city;

    var options = {
        hostname: 'api.openweathermap.org',
        path: '/data/2.5/weather?id=' + cid + '&appid=' + key + '&units=metric',
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
            'Content-Type': 'application/json'
        }
    };

    var weather = http.request(options, function (data) {
        var json = '';

        data.setEncoding('utf8');

        data.on('data', function (d) {
            json += d;
        });

        data.on('end', function () {
            var temp = JSON.parse(json);

            if (temp.cod === 200) {
                res.json(format.resJson(0, temp));
            } else {
                res.json(format.resJson(-1, temp));
            };
        });
    });

    weather.on('error', function (err) {
        res.json(format.resJson(-1, err));
    });

    weather.end();
}

module.exports = getCityWeather;