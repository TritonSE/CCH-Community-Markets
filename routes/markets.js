const express = require('express');
const router = express.Router();
const db = require('../db');

function generateKey(name, address) {
	let key = name.replace(/[^0-9a-zA-Z, ]/gi, '') + ", " + address.replace(/[^0-9a-zA-Z, ]/gi, '');
	return key.trim();
}

router.get('/', isAuthorized, function(req, res, next) {
	let markets = [];

	db.getAllMarkets().then(allMarkets => {
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
	}).catch(error => {
		console.log(error);
	});
});

function isAuthorized(req, res, next){
	if(req.cookies.token) {
		next();
	}

	else{
		res.render('admin-login');
	}
}
module.exports = router;
