const weather = require('../models/weather')
const methods = {}

methods.getWeather = function(req, res, next) {
    // console.log('Test');
    weather.cekWeather((data) => {
        res.send(data)
    })
}

module.exports = methods