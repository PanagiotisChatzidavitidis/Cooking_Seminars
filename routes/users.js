const express = require('express');
const router = express.Router();

const User = require('../models/User');

// POST (create data)
router.post('/', async (req, res) => {
  const postData = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    phone: req.body.phone,
    trait: req.body.trait
  });

  try {
    const userToSave = await postData.save();
    res.send(userToSave);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET1 (read data)
router.get('/', async (req, res) => {
  try {
    const getUsers = await User.find();
    res.send(getUsers);
  } catch (err) {
    res.send({ message: err });
  }
});

// GET2 (read specific data by id)
router.get('/:userId', async (req, res) => {
  try {
    const getUserById = await User.findById(req.params.userId);
    res.send(getUserById);
  } catch (err) {
    res.send({ message: err });
  }
});

// PATCH (Update data)
router.patch('/:userId', async (req, res) => {
  try {
    const updateUserById = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          country: req.body.country,
          city: req.body.city,
          address: req.body.address,
          phone: req.body.phone,
          trait: req.body.trait
        }
      },
      { new: true, runValidators: true }
    );
    res.send(updateUserById);
  } catch (err) {
    res.send({ message: err });
  }
});

// DELETE (Delete data by id)
router.delete('/:userId', async (req, res) => {
  try {
    const deleteUserById = await User.deleteOne({ _id: req.params.userId });
    res.send(deleteUserById);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
