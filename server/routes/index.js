'use strict';
const router = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// NOTE: routes user
router.post('/api/users', userController.insertOne)
router.get('/api/users', userController.getAll)
router.get('/api/users/:id', userController.getById)
router.get('/api/user/:username', userController.getByUsername)
router.put('/api/users/:id', userController.updateById)
router.delete('/api/users/:id', userController.deleteById)

// NOTE: routes auth atau Login
router.post('/api/login', authController.login)
router.post('/api/register', authController.register)

module.exports = router