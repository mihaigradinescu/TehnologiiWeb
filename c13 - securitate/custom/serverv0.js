'use strict'
const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
let sequelize = new Sequelize('node_security', 'root', '')

let User = sequelize.define('users', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	key: Sequelize.STRING
})

let app = express()

app.use(bodyParser.json())


app.post('/login', function(req, res) {
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

app.get('/create', function(req, res) {
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

app.post('/users', function(req, res) {
	var user = req.body
	User.create(user)
		.then(function() {
			res.status(201).send('created')
			
		})
		.catch(function(err) {
			console.log(err)
		})
})

app.get('/test', function(req, res) {
	res.status(200).send('authenticated')
})

app.listen(8080)


