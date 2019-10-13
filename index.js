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

// routing
server.use('/', app.routes);

server.listen(app.config.port, () => {
  log.info(`Started server on port ${app.config.port}`);
});
