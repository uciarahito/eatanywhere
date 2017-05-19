const weather = require('../models/weather')
const methods = {}

methods.getWeather = function(req, res, next) {
    // console.log('Test');
    weather.cekWeather((data) => {
        res.send(data)
        // res.send(data.current_observation.weather)
    })
}

methods.updateStatus = function(req, res) {
    weather.updateStatus(req, res)
}

methods.restaurant = (req, res, next) => {
    weather.restaurant(req.body.res_id, (data) => {
        let tempData = JSON.parse(data.text)
        let restName = tempData.name
        let restLocation = tempData.location.address
        let userRating = tempData.user_rating.aggregate_rating
        let votes = tempData.user_rating.votes
        let phoneNum = tempData.phone_numbers
        // let result = `${restName} Alamat: ${restLocation} Rating: ${userRating} Votes: ${votes} Phone Number: ${phoneNum}`
        // res.send(result)
        res.send(JSON.parse(data.text))
    })
}

methods.review = (req, res, next) => {
    weather.review(req.body.res_id, req.body.count, (data) => {
        // let tempData = JSON.parse(data.text)
        // let tempReview = tempData.user_reviews
        // console.log(tempReview.length);
        // res.send(tempReview)

        res.send(JSON.parse(data.text))
    })
}

module.exports = methods