const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
	db.getAllMarkets().then(function(result) {
		const markets = result.val();
		let marketOptions = [];

		for (const key in markets) {
			marketOptions.push({marketName: key});
		}

		marketOptions.push({marketName: "NEW MARKET"});
		res.render('assess', {marketOptions});
	});
});

module.exports = router;
