require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const express = require('express')
const passport = require('passport')
const util = require('util')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(passport.initialize())

const auth_router = express.Router()

passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: 'http://localhost:8080/auth/google/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		done(null, profile)
	}
))

app.use('/auth', auth_router)

auth_router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session : false}))

auth_router.get('/google/callback', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session : false}), (req, res) => {
	res.send({message : 'done', user : req.user})
})

app.listen(8080)