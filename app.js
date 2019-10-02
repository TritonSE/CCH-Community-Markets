const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/assess', require('./routes/assess'));
app.use('/markets', require('./routes/markets'));
app.use('/results', require('./routes/results'));
app.use('/data', require('./routes/data'));
app.use('/marketdata', require('./routes/marketdata'));
app.use('/admin-login', require('./routes/admin-login'));
app.use('/submit-assess', require('./routes/submit-assess'));

module.exports = app;
