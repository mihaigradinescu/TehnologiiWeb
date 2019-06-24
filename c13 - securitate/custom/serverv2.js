'use strict'
require('dotenv').config()
const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const moment = require('moment')
const crypto = require('crypto')
let sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect : 'mysql'
})

let User = sequelize.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	token: Sequelize.STRING,
	expiry:Sequelize.DATE
})

let app = express()
app.use(bodyParser.json())

let auth_router = express.Router()
let api_router = express.Router()
let admin_router = express.Router()

api_router.use((req, res, next) => {
	let token = req.headers.auth
	console.warn('test')
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

app.use('/auth', auth_router)
app.use('/api', api_router)
app.use('/admin', admin_router)

auth_router.post('/login', (req, res) => {
	let credentials = req.body
	let token
	User.find({
			where: {
				username: credentials.username,
				password: credentials.password
			}
		})
		.then((user) => {
			user.expiry = moment().add(300, 'seconds')
			token = crypto.randomBytes(64).toString('hex')
			user.token = token
			return user.save()
		})
		.then(() => {
			res.status(200).send({
				'message': 'you are in',
				'key': token
			})
		})
		.catch(function() {
			res.status(403).send('nope')
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

admin_router.post('/users', function(req, res) {
	var user = req.body
	User.create(user)
		.then(function() {
			res.status(201).send('created')

		})
		.catch(function(err) {
			console.log(err)
		})
})

api_router.get('/test', function(req, res) {
	res.status(200).send('all ok')
})

console.warn('starting on port 8080')
app.listen(8080)
