const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));

// app routes
app.use('/', require('./app/routes/index'));
app.use('/assess', require('./app/routes/assess'));
app.use('/markets', require('./app/routes/markets'));
app.use('/results', require('./app/routes/results'));
app.use('/data', require('./app/routes/data'));
app.use('/marketdata', require('./app/routes/marketdata'));
app.use('/admin-login', require('./app/routes/admin-login'));
app.use('/submit-assess', require('./app/routes/submit-assess'));

const port = 3000;
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
