const jwt = require('jsonwebtoken')
let methods = {}

methods.check_token_admin = (req, res, next) => {
    let x = req.headers.token
    jwt.verify(x, 'secret', (error, decoded) => {
        if (decoded) {
            if (decoded.role === 'admin') {
                next()
            }
        } else {
            res.send({
                error
            })
        }
    })
}

methods.check_token_member = (req, res, next) => {
    let x = req.headers.token
    jwt.verify(x, 'secret', (error, decoded) => {
        if (decoded) {
            if (decoded.role === 'member') {
                next()
            }
        } else {
            res.send({
                error
            })
        }
    })
}

methods.check_token_global = (req, res, next) => {
    let x = req.headers.token
    jwt.verify(x, 'secret', (error, decoded) => {
        if (decoded) {
            if (decoded.role === 'guest' || decoded.role === 'member') {
                next()
            }
        } else {
            res.send({
                error
            })
        }
    })
}

module.exports = methods