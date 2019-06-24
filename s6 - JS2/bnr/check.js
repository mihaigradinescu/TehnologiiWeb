'use strict'
const request = require('request-promise')
const parser = require('xml2json')
const moment = require('moment')

let getCourseGenerator = () => {
	let cache = {}
	let timestamp = null
	return async (currency) => {
		try{
			console.warn('called with ' + currency)
			if (!timestamp || moment().diff(timestamp, 'days') > 1){
				console.warn('rebuilding cache')
				let response = await request.get('http://www.bnr.ro/nbrfxrates.xml')
				let json = JSON.parse(parser.toJson(response))
				let body = json.DataSet.Body.Cube
				let date = moment(body.date)
				timestamp = date
				let rates = body.Rate
				for (let item of rates){
					// console.warn(item)
					cache[item['currency']] = item['multiplier'] ? parseFloat(item['$t']) * parseFloat(item['multiplier']) : parseFloat(item['$t'])
				}				
			}
			if (currency in cache){
				return cache[currency]		
			}
			else{
				return null
			}
		}
		catch(e){
			console.warn(e.stack)
		}
	}
}

let main = async () => {
	let getCourse = getCourseGenerator()
	let usd = await getCourse('USD')
	let eur = await getCourse('EUR')
	console.warn(usd)
	console.warn(eur)
}

main()