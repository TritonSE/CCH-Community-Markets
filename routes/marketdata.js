var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('./config.js');

if(!firebase.apps.length)
	firebase.initializeApp(config.config);

router.get('/', isAuthorized, function(req, res, next) {
	res.render('marketdata');
});

function isAuthorized(req, res, next){
	firebase.auth().onAuthStateChanged(function(user) {
		//user is signed in
		if(user)
			next();

		else
			res.render('admin-login');
	});
}

module.exports = router;
