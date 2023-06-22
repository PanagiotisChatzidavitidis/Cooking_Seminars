const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const bodyParser = require('body-parser');
const seminarRoute = require('./routes/seminars');
const userRoute = require('./routes/users');
const reservationRoute = require('./routes/reservations');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/seminars', seminarRoute);
app.use('/users', userRoute); // Add the user route
app.use('/reservations', reservationRoute);

app.get('/', (req, res) => {
  res.send('Homepage');
});

mongoose
  .connect(process.env.DB_CONNECTOR)
  .then(() => {
    console.log('DB is now connected...');
    app.listen(3000, () => {
      console.log('Server is up and running...');
    });
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });
