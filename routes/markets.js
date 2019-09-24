const express = require('express');
const firebase = require('firebase');
const config = require('./config.js');
const router = express.Router();

if (!firebase.apps.length) {
	firebase.initializeApp(config.config);
}
// Creates connection to database.
const db = firebase.database();
// Links to head of database.
const ref = db.ref("live_weller");
// Links to markets list.
const marketsRef = ref.child("markets");

router.get('/', function(req, res, next) {
	let markets = [];

	marketsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			const childData = childSnapshot.val().marketInfo;

			markets.push({
				name: childData.marketName, 
				address: childData.address, 
				size: childData.storeType, 
				zip: childData.zip,
				level: childData.marketLevel
			});
		});

		res.render('markets', {markets});
	});
});

module.exports = router;
