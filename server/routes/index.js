'use strict';
const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const weatherController = require('../controllers/weatherController')
const zomatoController = require('../controllers/zomatoController')
var jwtHelpers = require('../helpers/check_token')

// NOTE: routes user
router.post('/api/users', jwtHelpers.check_token_admin, userController.insertOne)
router.get('/api/users', jwtHelpers.check_token_admin, userController.getAll)
router.get('/api/users/:id', jwtHelpers.check_token_global, userController.getById)
router.get('/api/user/:username', jwtHelpers.check_token_global, userController.getByUsername)
router.put('/api/users/:id', jwtHelpers.check_token_admin, userController.updateById)
router.delete('/api/users/:id', jwtHelpers.check_token_admin, userController.deleteById)

// NOTE: routes for member for search
router.post('/api/location', jwtHelpers.check_token_member, zomatoController.location)
router.post('/api/location/detail', jwtHelpers.check_token_member, zomatoController.location_detail)

// NOTE: routes auth atau Login
router.post('/api/login', authController.login)
router.post('/api/register', authController.register)

// NOTE: routes weather
router.get('/api/weathers', weatherController.getWeather)


module.exports = router