const weather = require('../models/weather')
const methods = {}

methods.getWeather = function(req, res, next) {
    // console.log('Test');
    weather.cekWeather((data) => {
        res.send(data.current_observation.weather)
    })
}

methods.updateStatus = function(req, res) {
    weather.updateStatus(req, res)
}

module.exports = methods