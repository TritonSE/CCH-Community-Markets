const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', isAuthorized, function(req, res, next) {
	res.render('data');
});

function isAuthorized(req, res, next){
	if(req.cookies.token)
		next();
		
	else
		res.render('admin-login');
}

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

	db.getAllMarkets().then(markets => {
		for (const key in markets) {
			levels[parseInt(markets[key].marketInfo.marketLevel)]++;
			stores[markets[key].marketInfo.storeType.toLowerCase()]++;
		}
	
		res.json({levels, stores});
	}).catch(error => {
		console.log(error);
	});
});

router.post('/question', function(req, res) {
	const strippedKey = req.body.title.replace(/[^0-9a-zA-Z, ]/gi, '');
	let questionResults = [];
	let uniqueResults = {};

	db.getAllMarkets().then(markets => {
		for (const key in markets) {
			const question = markets[key].questions[strippedKey];
			if (question) {
				uniqueResults[question] = 0;
				questionResults.push(question);
			}
		}
	
		res.json({questionResults, uniqueResults});
	}).catch(error => {
		console.log(error);
	});
});

module.exports = router;