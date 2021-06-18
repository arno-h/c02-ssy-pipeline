const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const byte_counter = require('./services/byte_counter/router');

// Routes
app.use('/', index);
app.use('/byte_counter', byte_counter);

module.exports = app;
