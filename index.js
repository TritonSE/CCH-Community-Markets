const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = require('./app');

const log = app.logger;
const server = express();

// view engine setup
server.set('views', path.join(__dirname, 'app/views'));
server.set('view engine', 'ejs');

// middleware
server.use(morgan('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'app/public')));

// app routes
server.use('/', require('./app/routes/index'));
server.use('/assess', require('./app/routes/begin-assessment'));
server.use('/markets', require('./app/routes/market-table'));
server.use('/results', require('./app/routes/assessment-results'));
server.use('/data', require('./app/routes/visualize-markets'));
server.use('/market', require('./app/routes/individual-market-info'));
server.use('/login', require('./app/routes/login'));
server.use('/submit-assessment', require('./app/routes/submit-assessment'));

server.listen(app.config.port, () => {
  log.info(`Started server on port ${app.config.port}`);
});
