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
		let levZero = 0;
		let levOne = 0;
		let levTwo = 0;
		let levThree = 0;

		/* Store Type chart */
		let small = 0;
		let medium = 0;
		let large = 0;
		let convenience = 0;
		
		marketsRef.once('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				const childData = childSnapshot.val();
				const level = parseInt(childData.marketInfo.marketLevel);
				const type = childData.marketInfo.storeType;

				if (level == 0) {levZero++;}
				else if (level == 1) {levOne++;}
				else if (level == 2) {levTwo++;}
				else if (level == 3) {levThree++;}

				if (type == "Small") {small++;}
				else if (type == "Medium") {medium++;}
				else if (type == "Large") {large++;}
				else if (type == "Convenience") {convenience++;}
			});
			
			res.jsonp({levZero, levOne, levTwo, levThree, small, medium, large, convenience});
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