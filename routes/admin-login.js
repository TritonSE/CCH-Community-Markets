const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const config = require('./config.js');
const cookieParser = require('cookie-parser');
const cookies = require('cookies');

if(!firebase.apps.length)
	firebase.initializeApp(config.config);

router.get('/', function(req, res, next) {
	res.render('admin-login');
});

router.post('/login', function(req, res, next) {
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function() {
		res.cookie('token', req.body.email, {httpOnly: true});
		res.jsonp({success: true});
	}).catch(function(error) {
		console.log("invalid credentials");
		res.jsonp({success: false});
	});
});

//checks if signed in for the navbar 
router.post('/checkIfSignedIn', function(req, res) {
	if(req.cookies.token)
		res.jsonp({signedIn: true});

	else
		res.jsonp({signedIn: false});
});


//logs out user
router.post('/signOut', function(req, res, next){
	res.clearCookie('token');
	console.log(res.cookies.token);
});

module.exports = router;
