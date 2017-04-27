const User = require('../models/user')
const methods = {}

methods.insertOne = (req, res, next) => {
    User.create(req.body, (err, record) => {
        if (err) {
            res.json({
                err,
                message: 'Error waktu insert'
            })
        } else {
            res.json(record)
        }
    })
} // insertOne

methods.getAll = (req, res, next) => {
    User.find({}, (err, records) => {
        if (err) {
            res.json({
                err,
                message: 'Error waktu getAll'
            })
        } else {
            res.json(records)
        }
    })
} // getAll

methods.getById = (req, res, next) => {
    User.findById(req.params.id, (err, record) => {
        if (err) {
            res.json({
                err,
                message: 'Error waktu getById'
            })
        } else {
            res.json(record)
        }
    })
} //getById

methods.getByUsername = (req, res, next) => {
    User.findOne({
            username: req.params.username
        })
        .select('username')
        .exec((err, record) => {
            if (err) {
                res.json({
                    err,
                    message: 'Error waktu getByUsername'
                })
            } else {
                res.json(record)
            }
        })
} //getByUsername

methods.updateById = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        .exec((err, record) => {
            if (err) {
                res.json({
                    err,
                    message: 'Error waktu updateById'
                })
            } else {
                res.json(record)
            }
        })
} //updateById

methods.deleteById = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .exec((err, record) => {
            if (err) {
                res.json({
                    err,
                    message: 'Error waktu deleteById'
                })
            } else {
                res.json(record)
            }
        })
}

module.exports = methods