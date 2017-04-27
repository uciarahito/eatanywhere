const User = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
var methods = {}

methods.login = (username, password, next) => {
    User.findOne({
            username: username
        })
        .exec(function(err, record) {
            // console.log(typeof record.password);
            if (passwordHash.verify(password, record.password)) {
                let data = Object.assign({}, record.toJSON())
                // console.log(record);
                let token = jwt.sign(data, 'secret', {
                    expiresIn: '1h'
                })
                next(null, {
                    message: 'Login is Successful',
                    username: record.username,
                    role: record.role,
                    token
                })
            } else {
                next({
                    message: 'Your password is not match'
                })
            }
        })
} //login

methods.register = ((req, res, next) => {
    req.body.password = passwordHash.generate(req.body.password)
    User.create(req.body, (err, record) => {
        if (err) {
            res.json({
                err
            })
        } else {
            res.json({
                message: 'Register is Successful, please login to preceed'
            })
        }
    })
}) // register

module.exports = methods