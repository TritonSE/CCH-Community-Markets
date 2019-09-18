var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./routes/index');
var assess = require('./routes/assess');
var markets = require('./routes/markets');
var results = require('./routes/results');
var data = require('./routes/data');
var marketdata = require('./routes/marketdata');
var login = require('./routes/admin-login');
var admins = require('./routes/admin-panel');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/assess', assess);
app.use('/markets', markets);
app.use('/results',results);
app.use('/data',data);
app.use('/marketdata',marketdata);
app.use('/admin-login',login);
app.use('/admin-panel', admins);

var config = {
		apiKey: app.get('apiKey'),
		authDomain: app.get('authDomain'),
		databaseURL: app.get('databaseURL'),
		projectId: app.get('projectId'),
		storageBucket: app.get('storageBucket'),
		messagingSenderId: app.get('messagingSenderId')
};

app.set("test", "test2");

module.exports = app;
