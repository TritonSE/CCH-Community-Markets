const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const index = require('./routes/index');
const assess = require('./routes/assess');
const markets = require('./routes/markets');
const results = require('./routes/results');
const data = require('./routes/data');
const marketdata = require('./routes/marketdata');
const login = require('./routes/admin-login');
const submitassess = require('./routes/submit-assess');
const app = express();



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
app.use('/submit-assess', submitassess);

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
