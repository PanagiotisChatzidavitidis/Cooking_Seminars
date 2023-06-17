const express = require('express')
const router = express.Router()

const Seminar = require('../models/Seminar')
// POST (create data)
router.post('/',async(req,res)=>{
    //console.log(req.body)
    const postData = new Seminar ({
        seminar_name: req.body.seminar_name,
        seminar_date_end: req.body.seminar_date_end,
        seminar_date_start: req.body.seminar_date_start,
        seminar_description: req.body.seminar_description,
        seminar_duration: req.body.seminar_duration,
        seminar_capacity: req.body.seminar_capacity
    })
    // try to insert
    try{
        const seminarToSave = await postData.save()
        res.send(seminarToSave)
    }catch(err){
        res.send({message:err})
    }
})

// GET1 (read data)
router.get('/', async(req,res)=>{
    try{
        const getSeminars = await Seminar.find()
        res.send(getSeminars)
    }catch(err){
        res.send({message:err})
    }
})

// GET2 (read specific data by id)
router.get('/:seminarId', async(req,res)=>{
    try{
        const getSeminarById = await Seminar.findById(req.params.seminarId)
        res.send(getSeminarById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update data)
router.patch('/:seminarId', async(req,res) =>{
    try{
        const updateSeminarById = await Seminar.findByIdAndUpdate(
            {_id:req.params.seminarId},
            {$set:{
                seminar_name: req.body.seminar_name,
                seminar_date_end: req.body.seminar_date_end,
                seminar_date_start: req.body.seminar_date_start,
                seminar_description: req.body.seminar_description,
                seminar_duration: req.body.seminar_duration,
                seminar_capacity: req.body.seminar_capacity
                }
            },
            { new: true, runValidators: true }) //so order of the fields doesn't change
            res.send(updateSeminarById)
    }catch(err){
        res.send({message:err})
    }
})

//DELETE (Delete data by id)
router.delete('/:seminarId',async(req,res)=>{
    try{
        const deleteSeminarById = await Seminar.deleteOne({_id:req.params.seminarId})
        res.send(deleteSeminarById)
    }catch(err){
        res.send({message:err})
    }
   
})

module.exports = router