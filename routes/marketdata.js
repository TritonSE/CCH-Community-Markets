var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('./config.js');
var cookieParser = require('cookie-parser');

if(!firebase.apps.length)
	firebase.initializeApp(config.config);

router.get('/', isAuthorized, function(req, res, next) {
	res.render('marketdata');
});

function isAuthorized(req, res, next){
	if(res.cookies.token)
		next();

	else
		res.render('admin-login');
}

module.exports = router;
