const express = require('express');
const router = express.Router();
const db = require('../db.js');

function generateKey(name, address) {
	let key = name.replace(/[^0-9a-zA-Z, ]/gi, '') + ", " + address.replace(/[^0-9a-zA-Z, ]/gi, '');
	return key.trim();
}

router.get('/', function(req, res, next) {
	let markets = [];

	db.getAllMarkets().then(function(result) {
		const allMarkets = result.val();
		
		for (const key in allMarkets) {
			const childData = allMarkets[key].marketInfo;
			markets.push({
				name: childData.marketName, 
				address: childData.address, 
				size: childData.storeType, 
				zip: childData.zip,
				level: childData.marketLevel,
				key: generateKey(childData.marketName, childData.address)
			});
		}
	
		res.render('markets', {markets});
	});
});

module.exports = router;
