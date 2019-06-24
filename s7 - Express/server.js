'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const logging = require('./middleware/logging')
const ops = require('./routers/ops')


let app = express()

app.locals.kittens = [{name : 'timmy', color : 'black'}, {name : 'tommy', color : 'orange'}]
app.use(bodyParser.json())

app.use(logging.log)

app.use('/api', ops)

app.get('/kittens', (req, res) => {
    if (req.query && req.query.color){
        let filteredKittens = app.locals.kittens.filter((e) => e.color.startsWith(req.query.color))
        res.status(200).json(filteredKittens)
    }
    else{
        res.status(200).json(app.locals.kittens)
    }
})

app.listen(8080)