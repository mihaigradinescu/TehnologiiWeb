'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const sequelize = new Sequelize('sequelize_tests','root','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

const Student = sequelize.define('student', {
	firstName :{
	    type : Sequelize.STRING,
	    allowNull : false,
	    validate : { 
	        len : [3, 20]
	    }
	},
	lastName :{
	    type : Sequelize.STRING,
	    allowNull : false,
	    validate : { 
	        len : [3, 20]
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
		validate :{
			isNumeric : true,
			min : 0,
			max : 125
		}
	}
})

let Grade = sequelize.define('grade', {
	subject : {
	    type : Sequelize.STRING,
	    allowNull : false,
	    validate : { 
	        len : [3, 20]
	    }
	},
	value : {
		type : Sequelize.INTEGER,
		validate :{
			isNumeric : true,
			min : 1,
			max : 10
		}
	}
})

let Report = sequelize.define('report', {
	title : {
	    type : Sequelize.STRING,
	    allowNull : false,
	    validate : { 
	        len : [3, 20]
	    }
	},
	content : {
	    type : Sequelize.STRING,
	    allowNull : false,
	    validate : { 
	        len : [3, 20]
	    }
	},
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
		let pageSize = 10
		let params = {
			where : {},
			order : [['lastName', 'ASC'], ['firstName', 'ASC']]
		}
	    if (req.query){
	    	if (req.query.filter){
	    		params.where.lastName = {
                	[Op.like] : `%${req.query.filter}%`
                }
	    	}
	    	if (req.query.pageSize){
	    		pageSize = parseInt(req.query.pageSize)
	    	}
	    	if (req.query.pageNo){
	    		params.offset = parseInt(req.query.pageNo) * pageSize
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
		if (!student){
			res.status(404).send({message : 'not found'})
		}
		else{
			let grades = await student.getGrades()
			res.status(200).json(grades)
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/students/:id/grades', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id)
		if (!student){
			res.status(404).send({message : 'not found'})
		}
		else{
			let grade = req.body
			grade.studentId = student.id
			await Grade.create(grade)
			res.status(201).json({message : 'created'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}	
})

app.put('/students/:sid/grades/:gid', async (req, res) => {
	try {
		let student = await Student.findById(req.params.sid)
		if (!student){
			res.status(404).send({message : 'not found'})
		}
		else{
			let grades = await student.getGrades({where : {id : req.params.gid}})
			let grade = grades.shift()
			if (!grade){
				res.status(404).send({message : 'not found'})
			}
			else{
				await grade.update(req.body)
				res.status(202).json({message : 'accepted'})
			}
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}	
})

app.delete('/students/:sid/grades/:gid', async (req, res) => {
	try {
		let student = await Student.findById(req.params.sid)
		if (!student){
			res.status(404).send({message : 'not found'})
		}
		else{
			let grades = await student.getGrades({where : {id : req.params.gid}})
			let grade = grades.shift()
			if (!grade){
				res.status(404).send({message : 'not found'})
			}
			else{
				await grade.destroy()
				res.status(202).json({message : 'accepted'})
			}
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/students/:id/reports', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id, {include : ['grades']})
		if (!student){
			res.status(404).send({message : 'not found'})
		}
		else{
			res.status(200).json(student.grades)
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}	
})

app.post('/students/:id/reports', async (req, res) => {
	try {
		let student = await Student.findById(req.params.id)
		if (!student){
			res.status(404).send({message : 'not found'})
		}
		else{
			let report = req.body
			report.studentId = student.id
			await Report.create(report)
			res.status(201).json({message : 'created'})
		}
	} catch (e) {
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}		
})


app.listen(8080)