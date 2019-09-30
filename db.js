const firebase = require('firebase');
const config = require('./config.js');

if (!firebase.apps.length) {
	firebase.initializeApp(config.config);
}

const db = firebase.database().ref("live_weller").child("markets");

/**
 * This method returns a reference to the most recent version of the database.
 * Using the result of this method and .val(), you can access the entire
 * list of markets in JSON format.
 */
function exportAllMarkets() {
    return db.once('value');
}

/**
 * If the user selected "NEW MARKET" on the assessment page, this method is
 * called to upload the market to the database.
 * @param {*} info All question answers from the assessment page.
 */
function addNewMarket(info) {
    let marketName = info.marketInfo.marketName + ', ' + info.marketInfo.address;
    // Make sure illegal characters removed from key.
    marketName = marketName.replace(/[^0-9a-zA-Z, ]/gi, '').trim()

    // Add a new child to the markets reference in the database.
    db.child(marketName).set({
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

/**
 * If the user selected an existing market to fill out a new evaluation for,
 * this method is called to update its answers and level.
 * @param {*} info All question answers from the assessment page.
 */
function updateExistingMarket(info) {
    const marketsRef = db.child(info.marketInfo.marketName);

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

module.exports = {exportAllMarkets, addNewMarket, updateExistingMarket};