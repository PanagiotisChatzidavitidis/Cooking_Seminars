const express = require('express')
const router = express.Router()

const Seminar = require('../models/Seminar')

router.get('/', async (req,res) =>{ 
    try{
        const seminars = await Seminar.find() // .limit(5)
        res.send(seminars)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router