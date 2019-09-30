const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
	res.render('data');
});

router.get('/general', function(req, res) {
	/* Levels chart */
	let levels = [0, 0, 0, 0];

	/* Store Type chart */
	let stores =  {
		"small": 0,
		"medium": 0,
		"large": 0,
		"convenience": 0
	};

	db.getAllMarkets().then(function(result) {
		const markets = result.val();

		for (const key in markets) {
			levels[parseInt(markets[key].marketInfo.marketLevel)]++;
			stores[markets[key].marketInfo.storeType.toLowerCase()]++;
		}
	
		res.json({levels, stores});
	});
});

router.post('/question', function(req, res) {
	const strippedKey = req.body.title.replace(/[^0-9a-zA-Z, ]/gi, '');
	let questionResults = [];
	let uniqueResults = {};

	db.getAllMarkets().then(function(result) {
		const markets = result.val();
		
		for (const key in markets) {
			const question = markets[key].questions[strippedKey];
			if (question) {
				uniqueResults[question] = 0;
				questionResults.push(question);
			}
		}
	
		res.json({questionResults, uniqueResults});
	});
});

module.exports = router;