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
		let text_dark = marketName;
		let text_subdark = "";
		let text_muted_2 = "";
		let text_subdark_3 = "";
		let text_muted_3 = "";
        snapshot.forEach(function(childSnapshot) {
            let childData = childSnapshot.val();

            let name = childData.marketInfo.marketName;
            let address = childData.marketInfo.address;
            let size = childData.marketInfo.storeType;
            let level = childData.marketInfo.marketLevel;

            let firstName = childData.personalInfo.firstName;
            let lastName = childData.personalInfo.lastName;
            let email = childData.personalInfo.email;

            let questions = childData.questions;
            let missed = childData.missedQuestions;

            if (name === marketName) {
				text_dark += "<br>";
				text_dark += "Market Level: " + level;
                text_dark += "<br>";
                text_dark += "Address: " + address;
                text_dark += "<br>";
                text_dark += "Size: " + size;
                text_dark += "<br>";

                text_subdark += "Reviewer: " + firstName + " " + lastName;
                text_subdark += "<br>";
                text_subdark += "Email: " + email;
                text_subdark += "<br>";

                for (let key in questions) {
                    if (key !== "undefined") {
                        text_muted_2 += key + ": " + "<span class=\"boldanswer\">" + questions[key] + "</span>";
                        text_muted_2 += "<br>";
                    }
                }

                if (level === 3) {
                    text_subdark_3 += "Market is at Top Level!";
                } else {
                    text_subdark_3 += "Questions to fix to get to level " + (parseInt(level) + 1);
                }

                for (let key in missed) {
                    text_muted_3 += missed[key];
                    text_muted_3 += "<br>";
                }
            }
        });
		
		res.render('marketdata', {td: text_dark, tsd: text_subdark, tm2: text_muted_2, tsd3: text_subdark_3, tm3: text_muted_3});
    });
});

module.exports = router;
