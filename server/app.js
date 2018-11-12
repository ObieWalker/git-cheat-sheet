import logger from 'morgan';
import router from './routes/cheat'
import dotenv from 'dotenv';
const path = require('path');
const bodyParser = require('body-parser');
const open = require('open');
const mongoose = require('mongoose')
const express = require('express');
const port = process.env.PORT || 5000;
const app = express(); 

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
app.use(express.static('build'));
const env = process.env.NODE_ENV || 'development';

if (env !== 'test') {
  require('./database/database.js')
}

app.get('/hi', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// app.use('/api/v1/', router);
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV === 'development') {
      open(`${process.env.hostURL}:${port}`);
    }
  }
});


export default app;