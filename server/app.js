import logger from 'morgan';
import router from './routes/index'
import dotenv from 'dotenv';
import history from 'connect-history-api-fallback'
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
app.use(history())
dotenv.config();
app.use(express.static('build'));
const env = process.env.NODE_ENV || 'development';

if (env !== 'test') {
  require('./database/database.js')
}

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('build'));
// }


app.get('/hi', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.use('/api/v1/', router);

app.get('*', (req, res) => {
  // res.send({ message: 'hello world' });
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send({error: '404 not found'});
});

app.listen(port, function(err) {
  console.log("app is running on port", port)
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV === 'development') {
      open(`${process.env.hostURL}:${port}`);
    }
  }
});


export default app;