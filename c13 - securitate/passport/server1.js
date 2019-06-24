require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const express = require('express')
const passport = require('passport')
const util = require('util')
const bodyParser = require('body-parser')
const app = express()
const Sequelize = require('sequelize')
const crypto = require('crypto')
const moment = require('moment')

let sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect : 'mysql'
})

let User = sequelize.define('user', {
	token: Sequelize.STRING,
	expiry:Sequelize.DATE,
	profileId: Sequelize.STRING,
	name: Sequelize.STRING,
	email: Sequelize.STRING
})

app.use(bodyParser.json())
app.use(passport.initialize())

let auth_router = express.Router()
let api_router = express.Router()
let admin_router = express.Router()


passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: 'http://localhost:8080/auth/google/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({where : {profileId : profile.id}})
			.then((user) => {
				if (!user) {
					console.warn('creating new')
					user = new User()
					user.email = profile.emails[0].value
					user.profileId = profile.id
					user.name = profile.displayName
					user.token = crypto.randomBytes(64).toString('hex')
					user.expiry = moment().add(3600, 'seconds')
					console.warn(user.email)
					return user.save()
				}
				else{
					console.warn('found existing')
					user.token = crypto.randomBytes(64).toString('hex')
					user.expiry = moment().add(3600, 'seconds')
					console.warn(user.profileId + ' | ' + user.token)
					return user.save()		
				}
			})
		.then((user) => done(null, user))
		.catch((err)=> console.warn(err))
	}
))

app.use('/auth', auth_router)
app.use('/admin', admin_router)
app.use('/api', api_router)

auth_router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session : false}))

auth_router.get('/google/callback', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'], session : false}), (req, res) => {
	res.send({message : 'done', user : req.user})
})

api_router.use((req, res, next) => {
	let token = req.headers.token
	User.findOne({where : {
			token: token
		}})
		.then((user) => {
			if (!user) {
				res.status(403).send({
					'message': 'naughty, naughty!'
				})
			}
			else {
				console.warn(moment().diff(user.expiry, 'seconds'))
				if (moment().diff(user.expiry, 'seconds') < 0) {
					next()
				}
				else {
					res.status(403).send({
						'message': 'authentication expired'
					})
				}

			}
		})
		.catch((err) => {
			console.warn(err)
			res.status(500).send({
				'message': 'the hamsters are in trouble'
			})
		})
})

admin_router.get('/create', (req, res) => {
	sequelize
		.sync({
			force: true
		})
		.then(function() {
			res.status(200).send('ok')
		})
		.catch(function(err) {
			console.log('An error occurred while creating the table:', err)
		})
})

api_router.get('/test', function(req, res) {
	res.status(200).send('all ok')
})

app.listen(8080)