const express = require('express');
const firebase = require('firebase');
const config = require('./config.js');
const router = express.Router();

//initializing firebase if its not already
if(!firebase.apps.length) {
   firebase.initializeApp(config.config);
}

// Setup database communication.
const db = firebase.database();
const ref = db.ref("live_weller");

// Move to sub-directory.
const marketsRef = ref.child("markets");

router.get('/', function(req, res, next) {
	let marketOptions = [];

	//add all market names to marketOptions
	marketsRef.once('value', function(snapshot) {
   	snapshot.forEach(function(childSnapshot) {
			marketOptions.push({marketName: childSnapshot.key});
   	});
		
		marketOptions.push({marketName: "NEW MARKET"});

		//send marketOptions to assess.ejs
		res.render('assess', {marketOptions});
	});

});

module.exports = router;
