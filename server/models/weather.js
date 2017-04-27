require('dotenv').config()
var Wunderground = require('wundergroundnode');
var wunderground = new Wunderground(process.env.WEATHER_KEY);
var methods = {}
var Twitter = require('twitter');
const OAuth = require('oauth')

// wunderground.[resource calls(s)].request(myQuery, callback);

// NOTE: Open Weather API
methods.cekWeather = (callback) => {
    wunderground.conditions().request('-6.2583943,106.7784303', function(err, response) {
        callback(response)
    })
}

// NOTE: Twitter Update Status
var client = new Twitter({
    consumer_key: process.env.APPLICATION_CUSTOMER_KEY,
    consumer_secret: process.env.APPLICATION_SECRET,
    access_token_key: process.env.TEST_USER_TOKEN,
    access_token_secret: process.env.TEST_USER_SECRET
});

methods.updateStatus = function(req, res) {
    var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.APPLICATION_CUSTOMER_KEY,
        process.env.APPLICATION_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    oauth.post(
        `https://api.twitter.com/1.1/statuses/update.json?status=${req.params.status}`,
        process.env.TEST_USER_TOKEN, //test user token
        process.env.TEST_USER_SECRET, //test user secret
        req.params.status, "text",
        function(e, data) {
            if (e) console.error(e);
            res.send(data)
        });
}


module.exports = methods