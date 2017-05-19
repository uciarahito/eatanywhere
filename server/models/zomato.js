const request = require('superagent');
require('dotenv').config();

let methods = {}

methods.location = (query, count, callback) => {
    request
        .get(`https://developers.zomato.com/api/v2.1/locations?query=${query}&count=${count}`)
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

methods.location_detail = (id, type, callback) => {
    request
        .get(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${id}&entity_type=${type}`)
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

module.exports = methods;