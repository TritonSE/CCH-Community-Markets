const express = require('express');
const router = express.Router();
const firebase = require('firebase');

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

// Creates connection to database.
const db = firebase.database();
// Links to head of database.
const ref = db.ref("live_weller");
// Links to markets list.
const marketsRef = ref.child("markets");

router.get('/', function(req, res, next) {
	res.render('data');
});

router.post('/', function(req, res) {
	if (req.body.type === "general") {
		/* Levels chart */
		let levels = [0, 0, 0, 0];

		/* Store Type chart */
		let stores =  {
			"small": 0,
			"medium": 0,
			"large": 0,
			"convenience": 0
		};
		
		marketsRef.once('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				const childData = childSnapshot.val();
				const level = parseInt(childData.marketInfo.marketLevel);
				const type = childData.marketInfo.storeType.toLowerCase();

				levels[level]++;
				stores[type]++;
			});
			
			res.jsonp({levels, stores});
		});
	}
	else {
		const stripKey = req.body.title.replace(/[^0-9a-zA-Z, ]/gi, '');
		let questionResults = [];
		let uniqueResults = {};

        marketsRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                const childData = childSnapshot.val();
                try {
                    uniqueResults[childData.questions[stripKey]] = 0;
                    questionResults.push(childData.questions[stripKey]);
                } catch (err) {}
            });

            res.jsonp({questionResults, uniqueResults});
        });
	}
});

module.exports = router;