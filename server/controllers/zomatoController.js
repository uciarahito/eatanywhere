const zomato = require('../models/zomato');

const methods = {}

methods.location = (req, res, next) => {
    zomato.location(req.body.location, req.body.count, (data) => {
        res.send(JSON.parse(data.text).location_suggestions)
    })
}

methods.location_detail = (req, res, next) => {
    // console.log(req.body.entity_id);
    // console.log(req.body.entity_type);
    zomato.location_detail(req.body.entity_id, req.body.entity_type, (data) => {
        res.send(JSON.parse(data.text).best_rated_restaurant)
    })
}

module.exports = methods;