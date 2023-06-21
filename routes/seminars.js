const express = require('express');
const router = express.Router();

const Seminar = require('../models/Seminar');

// POST (create data)
router.post('/', async (req, res) => {
  try {
    const seminarData = new Seminar({
      seminar_name: req.body.seminar_name,
      seminar_date_end: req.body.seminar_date_end,
      seminar_date_start: req.body.seminar_date_start,
      seminar_description: req.body.seminar_description,
      seminar_duration: req.body.seminar_duration,
      seminar_capacity: req.body.seminar_capacity || 50,
      seminar_difficulty: req.body.seminar_difficulty,
      seminar_cost: req.body.seminar_cost
    });

    const seminarToSave = await seminarData.save();
    res.send(seminarToSave);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET1 (read data)
router.get('/', async (req, res) => {
  try {
    const getSeminars = await Seminar.find();
    res.send(getSeminars);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET2 (read specific data by id)
router.get('/:seminarId', async (req, res) => {
  try {
    const getSeminarById = await Seminar.findById(req.params.seminarId);
    res.send(getSeminarById);
  } catch (err) {
    res.send({ message: err });
  }
});

// PATCH (Update data)
router.patch('/:seminarName', async (req, res) => {
  try {
    // Update seminar by finding and updating based on seminar_name
    const updateSeminarByName = await Seminar.findOneAndUpdate(
      { seminar_name: req.params.seminarName }, // Find seminar with matching seminar_name
      {
        $set: {
          seminar_date_end: req.body.seminar_date_end,
          seminar_date_start: req.body.seminar_date_start,
          seminar_description: req.body.seminar_description,
          seminar_duration: req.body.seminar_duration,
          seminar_capacity: req.body.seminar_capacity,
          seminar_difficulty: req.body.seminar_difficulty,
          seminar_cost: req.body.seminar_cost
        }
      },
      { new: true, runValidators: true }
    );

    // Send the updated seminar as the response
    res.send(updateSeminarByName);
  } catch (err) {
    // If an error occurs, send an error message as the response
    res.send({ message: err });
  }
});



// DELETE (Delete data by seminar name)
router.delete('/:seminarName', async (req, res) => {
  try {
    const deleteSeminarByName = await Seminar.deleteOne({ seminar_name: req.params.seminarName });
    res.send(deleteSeminarByName);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
