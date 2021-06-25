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
const queue = require('./services/queue/router');
const host_counter = require('./services/host_counter/router');

// Routes
app.use('/', index);
app.use('/byte_counter', byte_counter);
app.use('/queue', queue);
app.use('/host_counter', host_counter);

module.exports = app;
