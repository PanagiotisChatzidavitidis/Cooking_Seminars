const express = require('express');
const router = express.Router();
const session = require('express-session');
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Configure session middleware
router.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // Session expiry time (optional)
  },
}));

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
      req.session.user = user; // Save the user object in the session

      // Display verification message in the terminal
      console.log('User signed in:', user);

      if (user.trait === 'User') {
        res.status(200).json({ success: true, message: 'Authentication successful', redirect: 'user_home.html' });
      } else if (user.trait === 'Admin') {
        res.status(200).json({ success: true, message: 'Authentication successful', redirect: 'admin_home.html' });
      } else {
        res.status(200).json({ success: true, message: 'Authentication successful', redirect: 'home.html' });
      }
    } else {
      // No user found, authentication failed
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//
router.get('/trait/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      const trait = user.trait;
      res.send({ trait });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});



// POST (sign-out)
router.post('/signout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error destroying session' });
    } else {
      // Clear the session cookie from the client's browser
      res.clearCookie('session'); // Replace 'session' with the actual name of your session cookie

      console.log('Session destroyed'); // Log session destroyed in the terminal
      res.status(200).json({ success: true, message: 'Session destroyed', redirect: 'home.html' });
    }
  });
});





module.exports = router;
