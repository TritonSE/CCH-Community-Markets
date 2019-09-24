var express = require('express');
var firebase = require('firebase');
var config = require('./config.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(!firebase.apps.length) {
     firebase.initializeApp(config.info());
	}

	// Setup database communication.
	const db = firebase.database();
	const ref = db.ref("live_weller");

	// Move to sub-directory.
	const marketsRef = ref.child("markets");
	let marketOptions = [];

	//add all market names to marketOptions
	marketsRef.once('value', function(snapshot) {
   	snapshot.forEach(function(childSnapshot) {
   		let marketName = childSnapshot.key;
			marketOptions.push({marketName: marketName});
   	});
		
		marketOptions.push({marketName: "NEW MARKET"});

		//send marketOptions to assess.ejs
		res.render('assess', {marketOptions});
	});

});

module.exports = router;
