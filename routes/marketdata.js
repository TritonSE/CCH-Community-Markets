const express = require('express');
const firebase = require('firebase');
const config = require('./config.js');
const router = express.Router();
const cookieParser = require('cookie-parser');

if (!firebase.apps.length) {
    firebase.initializeApp(config.config);
}
// Creates connection to database.
const db = firebase.database();
// Links to head of database.
const ref = db.ref("live_weller");
// Links to markets list.
const marketsRef = ref.child("markets");

router.get('/:marketKey', isAuthorized, function(req, res, next) {
    const market = marketsRef.child(req.params.marketKey);

    market.once('value', function(snapshot) {
        const childData = snapshot.val();

        let status = "Questions to fix to get to level " + (parseInt(childData.marketInfo.marketLevel) + 1);
        if (childData.marketInfo.marketLevel === 3) {
            status = "Market is at Top Level!";
        }

        let questions = []
        for (const key in childData.questions) {
            if (key !== "undefined") {
                questions.push({key: key, answer: childData.questions[key]});
            }
        }

        let missed = [];
        for (const key in childData.missedQuestions) {
            missed.push({key: childData.missedQuestions[key].replace('<span class=\"boldanswer\">', '').replace('</span>', '')});
        }

        res.render('marketdata', {
            name: childData.marketInfo.marketName,
            level: childData.marketInfo.marketLevel,
            address: childData.marketInfo.address,
            size: childData.marketInfo.storeType,
            first: childData.personalInfo.firstName,
            last: childData.personalInfo.lastName,
            email: childData.personalInfo.email,
            status,
            questions,
            missed
        })
    });
});

function isAuthorized(req, res, next){
	if(req.cookies.token)
		next();

	else
		res.render('admin-login');
}

module.exports = router;
