var fs = require('fs');
var _ = require('lodash');
var format = require('../utils/format');

var getCity = function (req, res) {
    var country = req.params.country.toUpperCase();
    var city = [];

    fs.readFile('./data/city-list.json', 'utf8', function (err, data) {
        if (err) {
            res.json(format.resJson(-1, err));
        };

        var souce = JSON.parse(data);

        souce.forEach(function (o, i) {
            if (o.country && o.country === country) {
                var temp = {};

                temp.cid = o._id;
                temp.cname = o.name;

                city.push(temp);
            };
        });

        res.json(format.resJson(0, city));
    });
};

module.exports = getCity;