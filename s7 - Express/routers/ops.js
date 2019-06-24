const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
    if ('reject' in req.headers){
        res.status(401).json({message : 'rejected'})
    }
    else{
        next()
    }
})

router.post('/add', (req, res) => {
    let op1 = req.body.op1
    let op2 = req.body.op2
    res.status(200).json({rez : op1 + op2})
})

module.exports = router