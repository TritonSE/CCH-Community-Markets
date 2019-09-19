var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('./config.js');

if(!firebase.apps.length){
	firebase.initializeApp(config.config);
}

const db = firebase.database();
router.get('/', function(req, res, next) {
	res.render('admin-login');
});

router.post('/', function(req, res) {
	const email = req.body.email;
	const password = req.body.password;
	var success = true;
	//attempting to sign in
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		console.log("invalid credentials");
	});
	
	res.jsonp({success: true});
});



module.exports = router;
