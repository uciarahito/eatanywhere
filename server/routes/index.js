'use strict';
const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const weatherController = require('../controllers/weatherController')
const zomatoController = require('../controllers/zomatoController')
var jwtHelpers = require('../helpers/check_token')
const passport = require('passport')

// NOTE: userController
router.post('/api/users', jwtHelpers.check_token_admin, userController.insertOne)
router.get('/api/users', jwtHelpers.check_token_member, userController.getAll)
router.get('/api/users/:id', jwtHelpers.check_token_global, userController.getById)
router.get('/api/user/:username', jwtHelpers.check_token_global, userController.getByUsername)
router.put('/api/users/:id', jwtHelpers.check_token_admin, userController.updateById)
router.delete('/api/users/:id', jwtHelpers.check_token_admin, userController.deleteById)

// NOTE: authController
// router.post('/api/login', authController.login)
router.post('/api/login', passport.authenticate('local', {
    session: false
}), function(req, res) {
    var user = req.user
    res.send(user)
})

router.post('/api/register', authController.register)

// NOTE: weatherController
router.get('/api/weathers', weatherController.getWeather) // dicomment karna uda dimasukkan ke updateStatus
router.post('/api/updateStatus', jwtHelpers.check_token_member, weatherController.updateStatus)
// router.post('/api/updateStatus/:status', weatherController.updateStatus)
router.post('/api/restaurant', jwtHelpers.check_token_member, weatherController.restaurant)
router.post('/api/review', jwtHelpers.check_token_member, weatherController.review)

// NOTE: zomatoController
router.post('/api/location', zomatoController.location)
router.post('/api/location/detail', jwtHelpers.check_token_member, zomatoController.location_detail)

module.exports = router