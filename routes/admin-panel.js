var express = require('express');
var firebase = require('firebase');
var admin = require('firebase-admin');
var serviceAccount = require('./live-weller-firebase-adminsdk-jt8k1-6492129b1d.json');
var config = require('./config.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(!admin.apps.length){
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: "https://live-weller.firebaseio.com"
		});
	}
	
	let admins = [];
	admin.auth().listUsers()
	.then(function(listUsersResult) {
		listUsersResult.users.forEach(function(userRecord) {

			if(userRecord.toJSON().email !== "tse@ucsd.edu"){
	  			admins.push({email: userRecord.toJSON().email});
			}
		});

		res.render('admin-panel', {admins});
	});
});

module.exports = router;
