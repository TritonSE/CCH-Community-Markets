var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();



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

const config = {
		apiKey: app.get('apiKey'),
		authDomain: app.get('authDomain'),
		databaseURL: app.get('databaseURL'),
		projectId: app.get('projectId'),
		storageBucket: app.get('storageBucket'),
		messagingSenderId: app.get('messagingSenderId')
};

app.set("test", "test2");

module.exports = app;
