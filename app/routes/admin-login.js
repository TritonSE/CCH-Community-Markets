const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const config = require('../config');
const cookieParser = require('cookie-parser');

if(!firebase.apps.length)
	firebase.initializeApp(config.firebase);

router.get('/', function(req, res, next) {
	res.render('admin-login');
});

router.post('/login', function(req, res, next) {
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function() {
		res.cookie('token', req.body.email, {path: '/'});
		res.jsonp({success: true});
	}).catch(function(error) {
		console.log("invalid credentials");
		res.jsonp({success: false});
	});
});

//checks if signed in for the navbar
router.get('/checkIfSignedIn', function(req, res, next) {
	if(req.cookies.token)
		res.jsonp({signedIn: true});

	else
		res.jsonp({signedIn: false});
});


//logs out user
router.post('/signOut', function(req, res, next){
	res.clearCookie('token', {path: '/'}).send("logged out");
});

module.exports = router;
