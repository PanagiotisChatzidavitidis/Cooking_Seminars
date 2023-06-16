const express = require('express')
const app = express()

const mongoose = require('mongoose')

const seminarsRoute = require('./routes/seminars');

// Middleware
app.use('/seminars', seminarsRoute);

// Create route
app.get('/', (req, res) => {
  res.send('Homepage');
});

const MURL = 'mongodb+srv://admin:1234@cluster0.leg7fsv.mongodb.net/Delicious_Creations?retryWrites=true&w=majority';

(async () => {
  try {
    await mongoose.connect(MURL);
    console.log('Your MongoDB connection is established...');
    app.listen(3001, () => {
      console.log('Server is up and running...');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();
