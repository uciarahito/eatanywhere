var Wunderground = require('wundergroundnode');
var myKey = 'b20c23fa3beaf9df';
var wunderground = new Wunderground(myKey);
var methods = {}

// wunderground.[resource calls(s)].request(myQuery, callback);

methods.cekWeather = (callback) => {
    wunderground.conditions().request('-6.2583943,106.7784303', function(err, response) {
        callback(response)
    })
}

module.exports = methods