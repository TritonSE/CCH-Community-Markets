const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const config = require('./config.js');

if (!firebase.apps.length) {
    firebase.initializeApp(config.config);
}

const db = firebase.database();
const ref = db.ref("live_weller");
let marketsRef = ref.child("markets");

router.post('/', submitMarket, function(req, res) {
    res.jsonp({success: "true"});
});

function submitMarket(req, res, next) {
    const info = JSON.parse(req.body.data);

    if (info.existing === "true") {
        marketsRef = marketsRef.child(info.marketInfo.marketName);

        // Update market level.
        marketsRef.child("marketInfo").update({
            marketLevel: info.level
        });
        // Update user info.
        marketsRef.child("personalInfo").update({
            firstName: info.marketInfo.firstName,
            lastName: info.marketInfo.lastName,
            email: info.marketInfo.email
        });
        // Update question responses.
        marketsRef.child("questions").set(info.questions);
        marketsRef.child("missedQuestions").set(info.betterQuestions);
    }
    else {
        let marketName = info.marketInfo.marketName + ', ' + info.marketInfo.address;
        // Make sure illegal characters removed from key.
        marketName = marketName.replace(/[^0-9a-zA-Z, ]/gi, '').trim()

        marketsRef.child(marketName).set({
            personalInfo: {
                firstName: info.marketInfo.firstName,
                lastName: info.marketInfo.lastName,
                email: info.marketInfo.email,
            },
            marketInfo: {
                marketName: info.marketInfo.marketName,
                storeType: info.marketInfo.storeType,
                address: info.marketInfo.address,
                city: info.marketInfo.city,
                state: info.marketInfo.state,
                zip: info.marketInfo.zip,
                marketLevel: info.level
            },
            questions: info.questions,
            missedQuestions: info.betterQuestions
        });
    }
}

module.exports = router;