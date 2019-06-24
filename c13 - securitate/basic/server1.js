const express = require('express')

const app = express()
 
app.use((req, res, next) => {
	console.warn(req.headers)
	if (req.headers.authorization){
		let encoded = req.headers.authorization.split(' ')[1]
		let decoded = new Buffer(encoded, 'base64').toString('utf8')
		let [username, password] = decoded.split(':')
		// actually check username
		if (username === 'testuser' && password === 'testpassword'){
			next()
		}
		else{
			res.status(403).send('unauthorized')
		}
	}
	else{
		res.status(403).send('unauthorized')
	}
})

app.get('/test', (req, res) => {
	res.status(200).send('got it')
})

app.listen(8080)