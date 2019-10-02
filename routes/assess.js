const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
	db.getAllMarkets().then(markets => {
		let marketOptions = [];

		for (const key in markets) {
			marketOptions.push({marketName: key});
		}

		marketOptions.push({marketName: "NEW MARKET"});
		res.render('assess', {marketOptions});
	}).catch(error => {
		console.log(error);
	});
});

module.exports = router;
