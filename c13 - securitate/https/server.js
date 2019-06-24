'use strict'
require('dotenv').config({path:'./server.env'})
const fs = require('fs')
const http = require('http')
const https = require('https')

let privateKey = fs.readFileSync('certs/key.pem', 'utf8')
let certificate = fs.readFileSync('certs/cert.pem', 'utf8')
let credentials = {
      key: privateKey,
      cert: certificate,
      passphrase : process.env.SSL_PASSPHRASE
}

let express = require('express')
let app = express()

app.get('/ping', (req, res) => {
  res.status(200).send({
        message: 'pong'
  })
})

let httpServer = http.createServer(app)
let httpsServer = https.createServer(credentials, app)

httpServer.listen(8080)
httpsServer.listen(8443)
