'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.locals = {
	widgets : [{
		name : 'test', description : 'test description'
	}]
}

app.get('/widgets', (req, res) => {
	res.status(200).json(app.locals.widgets)
})

app.listen(8080)
