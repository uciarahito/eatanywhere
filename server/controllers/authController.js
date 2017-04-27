const User = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const methods = {}

methods.login = ((req, res, next) => {
    User.findOne({
            username: req.body.username
        })
        .exec((err, record) => {
            if (err) {
                res.json({
                    err
                })
            } else {
                if (passwordHash.verify(req.body.password, record.password)) {
                    let data = Object.assign({}, record.toJSON())
                    delete data.password

                    let token = jwt.sign(data, 'secret', {
                        expiresIn: '1h'
                    })
                    res.json({
                        message: 'Login is Successful',
                        username: data.username,
                        role: data.role,
                        token
                    })
                } else {
                    res.json({
                        message: 'Your password is not match'
                    })
                }
            }
        })
})

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
})

module.exports = methods