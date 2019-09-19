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

router.get('/:marketName', function(req, res, next) {
    const marketName = req.params.marketName;

    marketsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const childData = childSnapshot.val();
            
            let status = "";
            let questions = []
            let missed = [];

            if (childData.marketInfo.marketName === marketName) {
                status = "Questions to fix to get to level " + (parseInt(childData.marketInfo.marketLevel) + 1);
                
                if (childData.marketInfo.marketLevel === 3) {
                    status = "Market is at Top Level!";
                }

                for (let key in childData.questions) {
                    if (key !== "undefined") {
                        questions.push({key: key, answer: childData.questions[key]});
                    }
                }

                for (let key in childData.missedQuestions) {
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
            }
        });		
    });
});

module.exports = router;
