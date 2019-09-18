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
	
	let data = "";

	admin.auth().listUsers()
	.then(function(listUsersResult) {
	  listUsersResult.users.forEach(function(userRecord) {
	  	let markup = "<tr><th>" + userRecord.toJSON().email + "</th><th>" + "<button value="+ userRecord.toJSON().email+ ">Remove </button></th></tr>";
		
		if(userRecord.toJSON().email !== "tse@ucsd.edu"){
	  		data += markup;
		}
	  });

		res.render('admin-panel', {data: data});
	})
});

module.exports = router;
