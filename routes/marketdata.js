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
            let childData = childSnapshot.val();

            let name = childData.marketInfo.marketName;
            let address = childData.marketInfo.address;
            let size = childData.marketInfo.storeType;
            let level = childData.marketInfo.marketLevel;

            let firstName = childData.personalInfo.firstName;
            let lastName = childData.personalInfo.lastName;
            let email = childData.personalInfo.email;
            
            let marketStatus = "";
            let questions = []
            let missed = [];

            if (name === marketName) {
                marketStatus = "Questions to fix to get to level " + (parseInt(level) + 1);
                if (level === 3) {
                    marketStatus = "Market is at Top Level!";
                }

                for (let key in childData.questions) {
                    if (key !== "undefined") {
                        questions.push({key: key, answer: childData.questions[key]});
                    }
                }

                for (let key in childData.missedQuestions) {
                    missed.push({key: childData.missedQuestions[key].replace('<span class=\"boldanswer\">', '').replace('</span>', '')});
                }

                res.render('marketdata', {name: marketName, level: level, address: address, size: size, first: firstName, last: lastName, email: email, status: marketStatus, questions: questions, missed: missed});
            }
        });		
    });
});

module.exports = router;
