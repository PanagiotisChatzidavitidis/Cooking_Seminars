const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')

const bodyParser = require('body-parser');
const postRoute = require('./routes/seminars');

app.use(bodyParser.json());
app.use('/seminars', postRoute);

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