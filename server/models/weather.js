require('dotenv').config()
var Wunderground = require('wundergroundnode');
var wunderground = new Wunderground(process.env.WEATHER_KEY);
var methods = {}
var Twitter = require('twitter');
const OAuth = require('oauth')
const request = require('superagent');
require('dotenv').config();

// NOTE: Open Weather API
methods.cekWeather = (callback) => {
    wunderground.conditions().request('-6.1951710000,106.8202360000', function(err, response) {
        callback(response)
    })
}

// NOTE: Get data detail restaurant
methods.restaurant = (id, callback) => {
    request
        .get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`)
        .set({
            "user-key": process.env.ZOMATO_API_KEY
        })
        .set('Accept', 'application/json')
        .end(function(err, data) {
            // Calling the end function will send the request
            if (err) throw err
            callback(data)
        });
}

let restaurant = (id, callback) => {
    request
        .get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`)
        .set({
            "user-key": process.env.ZOMATO_API_KEY
        })
        .set('Accept', 'application/json')
        .end(function(err, data) {
            // Calling the end function will send the request
            if (err) throw err
            callback(data)
        });
}

// NOTE: Review by res_id and count
methods.review = (id, count, callback) => {
    request
        .get(`https://developers.zomato.com/api/v2.1/reviews?res_id=${id}&count=${count}`)
        .set({
            "user-key": process.env.ZOMATO_API_KEY
        })
        .set('Accept', 'application/json')
        .end(function(err, data) {
            // Calling the end function will send the request
            if (err) throw err
            callback(data)
        });
}

// NOTE: get data weather saat itu juga
// let cekWeather = (callback) => {
//     wunderground.conditions().request(`${latitude},${longitude}`, function(err, response) {
//         callback(response)
//     })
// }

// let getWeather = function(req, res, next) {
//     cekWeather((data) => {
//         res.send(data.current_observation.weather)
//     })
// }

// NOTE: Twitter Update Status
// methods.updateStatus = function(req, res) {
//     var oauth = new OAuth.OAuth(
//         'https://api.twitter.com/oauth/request_token',
//         'https://api.twitter.com/oauth/access_token',
//         process.env.APPLICATION_CUSTOMER_KEY,
//         process.env.APPLICATION_SECRET,
//         '1.0A',
//         null,
//         'HMAC-SHA1'
//     );
//     oauth.post(
//         `https://api.twitter.com/1.1/statuses/update.json?status=${req.params.status}`,
//         process.env.TEST_USER_TOKEN, //test user token
//         process.env.TEST_USER_SECRET, //test user secret
//         req.body.status, "text",
//         function(e, data) {
//             if (e) console.error(e);
//             // let hashtag = `${data.entities.hashtags} ${weatherByLatLong}`
//             // res.send(hashtag)
//             res.send(data)
//         });
// }

var secret = {
    consumer_key: process.env.APPLICATION_CUSTOMER_KEY,
    consumer_secret: process.env.APPLICATION_SECRET,
    access_token_key: process.env.TEST_USER_TOKEN,
    access_token_secret: process.env.TEST_USER_SECRET
}
var Twitter = new Twitter(secret);

methods.updateStatus = function(req, res) {
    restaurant(req.body.res_id, (data) => {
        let tempData = JSON.parse(data.text)
        let restName = tempData.name
        let restLocation = tempData.location.city
        let userRating = tempData.user_rating.aggregate_rating
        let votes = tempData.user_rating.votes
        let phoneNum = tempData.phone_numbers
        let latitude = tempData.location.latitude
        let longitude = tempData.location.longitude
        // let result = `${restName} Alamat: ${restLocation} Rating: ${userRating} Votes: ${votes} Phone Number: ${phoneNum}`
        // console.log(`${restName} Alamat: ${restLocation} Rating: ${userRating} Votes: ${votes} Phone Number: ${phoneNum}`);

        let cekWeather = (callback) => {
            wunderground.conditions().request(`${latitude},${longitude}`, function(err, response) {
                callback(response)
            })
        }

        cekWeather((dataWeather) => {
            Twitter.post('https://api.twitter.com/1.1/statuses/update.json', {
                status: `${req.body.status} #Restaurant:${restName} #Lokasi:${restLocation} #Cuaca:${dataWeather.current_observation.weather}`
                // status: 'Try using hashtag from Wunderground API #Cuaca:' + dataWeather.current_observation.weather
            }, function(error, tweet, response) {
                if (error) {
                    console.log(error);
                }
                res.send(tweet)
            });
        })
    })
}

module.exports = methods