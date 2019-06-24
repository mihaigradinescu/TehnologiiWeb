var app = require('express')()
var basicAuth = require('express-basic-auth')
 
app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))

app.get('/test', (req, res) => {
	res.status(200).send('got it')
})

app.listen(8080)