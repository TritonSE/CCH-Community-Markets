const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const config = require('./config.js');

if (!firebase.apps.length) {
    firebase.initializeApp(config.config);
}

router.post('/', submitMarket, function(req, res) {
    
});

function submitMarket(req, res, next) {
    console.log(req.body);


    // EXISTING
    // var marketName = responses[3].value;
    // marketsRef = marketsRef.child(marketName);

    // // Update market level.
    // marketsRef.child("marketInfo").update({
    //     marketLevel: marketLevel
    // });
    // // Update user info.
    // marketsRef.child("personalInfo").update({
    //     firstName: responses[0].value,
    //     lastName: responses[1].value,
    //     email: responses[2].value
    // });
    // // Update question responses.
    // marketsRef.child("questions").set(questionsList);
    // marketsRef.child("missedQuestions").set(doBetterQuestions);

    // NEW
    // var marketName = responses[4].value + ', ' + responses[6].value;
    // // Make sure illegal characters removed from key.
    // marketName = marketName.replace(/[^0-9a-zA-Z," ]/gi, '').trim()

    // marketsRef.child(marketName).set({
    //     personalInfo: {
    //         firstName: responses[0].value,
    //         lastName: responses[1].value,
    //         email: responses[2].value,
    //     },
    //     marketInfo: {
    //         marketName: responses[4].value,
    //         storeType: responses[5].value,
    //         address: responses[6].value,
    //         city: responses[7].value,
    //         state: responses[8].value,
    //         zip: responses[9].value,
    //         marketLevel: marketLevel
    //     },
    //     questions: questionsList,
    //     missedQuestions: doBetterQuestions
    // });
}