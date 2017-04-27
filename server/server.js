const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const authController = require('./controllers/authController')

mongoose.connect('mongodb://localhost/eatanywhere');

// NOTE: set
app.set('port', process.env.PORT || 3000)

// NOTE: use
// app.use(require('cors'))

/* jika gagal melalui instal cors, maka tambah code di bawah ini */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
    next()
})
app.use(require('morgan')('dev'))
app.use(require('body-parser').urlencoded({
    extended: false
}));
app.use(require('body-parser').json());

passport.use(new Strategy(authController.login));

app.use(passport.initialize());

app.use('/', require('./routes'))

// NOTE: run
app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'));
})