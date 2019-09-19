var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('./config.js');

if(!firebase.apps.length){
	firebase.initializeApp(config.config);
}

const db = firebase.database();

router.get('/', isAuthorized, function(req, res, next) {
	res.render('markets');
});

function isAuthorized(req, res, next){
	firebase.auth().onAuthStateChanged(function(user) {
		//user is signed in 
		if(user){
			next();
		}
		
		//not signed in 
		else{
			res.render('admin-login');
		}
	});
}
module.exports = router;
