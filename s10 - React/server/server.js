'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize_tests','root','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

const Student = sequelize.define('student', {
	firstName : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},	
	lastName : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},	
	email : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			isEmail : true
		}
	},
	age : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			min : 0,
			max : 125
		}
	}
})

const Grade = sequelize.define('grade', {
	subject : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 255]
		}
	},
	value : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			min : 1,
			max : 10
		}
	}
})

const Report = sequelize.define('report', {
	title : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 255]
		}
	},
	content : Sequelize.TEXT
})

Student.hasMany(Grade)
Student.hasMany(Report)

const app = express()
app.use(bodyParser.json())
app.use(express.static('../simple-app/build'))

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		res.status(201).json({message : 'created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/students', async (req, res) => {
	try{
	    let params = {
	    	where : {},
	    	order : [
	    		['lastName', 'ASC'],
	    		['firstName', 'ASC']
	    	]
	    }
	    let pageSize = 10
	    if (req.query){
	    	if (req.query.filter){
	    		params.where.lastName = {
                    [Sequelize.Op.like] : `%${req.query.filter}%`
                }
	    	}
	    	if (req.query.pageSize){
	    		pageSize = parseInt(req.query.pageSize)
	    	}
	    	if (req.query.pageNo){
	    		params.offset = pageSize * parseInt(req.query.pageNo)
	    		params.limit = pageSize
	    	}
	    }
	    let students = await Student.findAll(params)    
		res.status(200).json(students)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/students', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await Student.bulkCreate(req.body)
			res.status(201).json({message : 'created'})
		}
		else{
			await Student.create(req.body)
			res.status(201).json({message : 'created'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/students/:id', async (req, res) => {
	try{
		let student = await Student.findById(req.params.id)
		if (student){
			res.status(200).json(student)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/students/:id', async (req, res) => {
	try{
		let student = await Student.findById(req.params.id)
		if (student){
			await student.update(req.body)
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/students/:id', async (req, res) => {
	try{
		let student = await Student.findById(req.params.id)
		if (student){
			await student.destroy()
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/students/:id/grades', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id)
		if (student){
			let grades = await student.getGrades()
			res.status(200).json(grades)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/students/:id/grades', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id)
		if (student){
			let grade = req.body
			grade.studentId = student.id
			await Grade.create(grade)
			res.status(201).json({message : 'created'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/students/:id/reports', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id,{
			include : ['reports']
		})
		if (student){
			res.status(200).json(student.reports)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}	
})

app.post('/students/:id/reports', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id)
		if (student){
			let report = req.body
			report.studentId = student.id
			await Report.create(report)
			res.status(201).json({message : 'created'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.listen(8080)