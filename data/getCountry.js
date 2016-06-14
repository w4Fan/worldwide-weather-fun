var fs = require('fs');
var _ = require('lodash');
var format = require('../utils/format');
var country = [];

var getCountry = function (req, res) {
    if (country.length) {
        res.json(format.resJson(0, country));
        return;
    };

    fs.readFile('./data/city-list.json', 'utf8', function (err, data) {
        if (err) {
            res.json(format.resJson(-1, err));
        };

        var souce = JSON.parse(data);

        souce.forEach(function (o, i) {
            if (o.country) {
                country.push(o.country);
            };
        });

        country = _.uniq(country).sort();
        res.json(format.resJson(0, country));
    });
};

module.exports = getCountry;