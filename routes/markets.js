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
			let childData = childSnapshot.val();

			let name = childData.marketInfo.marketName;
			let address = childData.marketInfo.address;
			let size = childData.marketInfo.storeType;
			let zip = childData.marketInfo.zip;
			let level = childData.marketInfo.marketLevel;

			markets.push({name: name, address: address, size: size, zip: zip, level: level});
		});

		res.render('markets', {markets: markets});
	});
});

module.exports = router;
