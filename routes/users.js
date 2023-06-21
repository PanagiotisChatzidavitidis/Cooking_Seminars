const express = require('express');
const router = express.Router();
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// POST (create data)
router.post('/', async (req, res) => {
  const userData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
    const savedUser = await userData.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// GET1 (read data)
router.get('/', async (req, res) => {
  try {
    const getUsers = await User.find();
    res.send(getUsers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET2 (read specific data by id)
router.get('/:userId', async (req, res) => {
  try {
    const getUserById = await User.findById(req.params.userId);
    res.send(getUserById);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET3 (search data)
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.search; // Get the search term from the query parameters

    // Construct a query to search for the term in relevant fields of the seminar collection
    const query = {
      $or: [
        { seminar_name: { $regex: searchTerm, $options: 'i' } },
        { seminar_date_start: { $regex: searchTerm, $options: 'i' } },
        { seminar_date_end: { $regex: searchTerm, $options: 'i' } },
        { seminar_description: { $regex: searchTerm, $options: 'i' } },
        { seminar_duration: { $regex: searchTerm, $options: 'i' } },
        { seminar_difficulty: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    const searchResults = await Seminar.find(query);
    res.send(searchResults);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});


// PATCH (Update data by username)
router.patch('/:username', async (req, res) => {
  try {
    const updateUserByUsername = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
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

    // Exclude username, password, and email from being updated
    updateUserByUsername.username = req.body.username;
    updateUserByUsername.email = req.body.email;

    await updateUserByUsername.save();

    res.send(updateUserByUsername);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// DELETE (Delete data by id)
router.delete('/:userId', async (req, res) => {
  try {
    const deleteUserById = await User.deleteOne({ _id: req.params.userId });
    res.send(deleteUserById);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST (sign-in)
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username, password: password });
    if (user) {
      // User found, authentication successful
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      // No user found, authentication failed
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


module.exports = router;
