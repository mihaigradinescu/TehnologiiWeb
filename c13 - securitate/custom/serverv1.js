'use strict'
const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const moment = require('moment')
let sequelize = new Sequelize('node_security', 'root', '')

let User = sequelize.define('users', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	key: Sequelize.STRING
})

let app = express()
app.use(bodyParser.json())

let auth_router = express.Router()
let api_router = express.Router()
let admin_router = express.Router()

api_router.use(function (req, res, next) {
  if (req.headers.auth && req.headers.auth == 'somekey'){
		next()
	}
	else{
		res.status(403).send('denied')	
	}	
})

app.use('/auth', auth_router)
app.use('/api', api_router)
app.use('/admin', admin_router)

auth_router.post('/login', function(req, res) {
	let credentials = req.body
	User.find({
			where: {
				username: credentials.username,
				password: credentials.password
			}
		})
		.then(function() {
			res.status(200).send({
				'message': 'you are in',
				'key': 'somekey'
			})
		})
		.catch(function() {
			res.status(403).send('nope')
		})
})

admin_router.get('/create', function(req, res) {
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

app.listen(8080)


