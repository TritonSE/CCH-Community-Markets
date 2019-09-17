var express = require('express');
var firebase = require('firebase');
var config = require('./config.js');
var router = express.Router();

router.get('/:marketName', function(req, res, next) {
    var marketName = req.params.marketName;
    
    if (!firebase.apps.length) {
        firebase.initializeApp(config.info());
    }
    
    // Creates connection to database.
    var db = firebase.database();
    // Links to head of database.
    var ref = db.ref("live_weller");
    // Links to markets list.
    var marketsRef = ref.child("markets");

    marketsRef.once('value', function(snapshot) {
		var text_dark = marketName;
		var text_subdark = "";
		var text_muted_2 = "";
		var text_subdark_3 = "";
		var text_muted_3 = "";
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();

            var name = childData.marketInfo.marketName;
            var address = childData.marketInfo.address;
            var size = childData.marketInfo.storeType;
            var level = childData.marketInfo.marketLevel;

            var firstName = childData.personalInfo.firstName;
            var lastName = childData.personalInfo.lastName;
            var email = childData.personalInfo.email;

            var questions = childData.questions;
            var missed = childData.missedQuestions;

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

                for (var key in questions) {
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

                for (var key in missed) {
                    text_muted_3 += missed[key];
                    text_muted_3 += "<br>";
                }
            }
		});
		
		res.render('marketdata', {td: text_dark, tsd: text_subdark, tm2: text_muted_2, tsd3: text_subdark_3, tm3: text_muted_3});
    });
});

module.exports = router;
