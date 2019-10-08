const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tseucsd:abctse@live-weller-5tgkd.mongodb.net/admin?retryWrites=true&w=majority";

let db = null;
setupReference().then(ref => db = ref);

/**
 * Call this method to return a Promise to retrieve a reference to MongoDB.
 */
function setupReference() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri)
            .then(result => resolve(result))
            .catch(function(err) { console.log(err); })
    });
}

/**
 * By calling this method and using .then() for the callback, you can access 
 * the entire list of markets in JSON format.
 * 
 * This returns a Promise so that once the database values are secured, they can
 * be worked with in a different location/file.
 */
function getAllMarkets() {
    return new Promise((resolve, reject) => {
        db.db('live-weller-test').collection('markets')
            .find({}).toArray()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

/**
 * By calling this method and using .then() for the callback, you can access 
 * a single market's information in JSON format.
 * 
 * This returns a Promise so that once the database values are secured, they can
 * be worked with in a different location/file.
 */
function getSpecificMarket(market) {
    return new Promise((resolve, reject) => {
        db.db('live-weller-test').collection('markets')
            .findOne({"_id": market})
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
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
    // db.child(marketName).set({
    //     personalInfo: {
    //         firstName: info.marketInfo.firstName,
    //         lastName: info.marketInfo.lastName,
    //         email: info.marketInfo.email,
    //     },
    //     marketInfo: {
    //         marketName: info.marketInfo.marketName,
    //         storeType: info.marketInfo.storeType,
    //         address: info.marketInfo.address,
    //         city: info.marketInfo.city,
    //         state: info.marketInfo.state,
    //         zip: info.marketInfo.zip,
    //         marketLevel: info.level
    //     },
    //     questions: info.questions,
    //     missedQuestions: info.betterQuestions
    // });
}

/**
 * If the user selected an existing market to fill out a new evaluation for,
 * this method is called to update its answers and level.
 * @param {*} info All question answers from the assessment page.
 */
function updateExistingMarket(info) {
    // const marketsRef = db.child(info.marketInfo.marketName);

    // // Update market level.
    // marketsRef.child("marketInfo").update({
    //     marketLevel: info.level
    // });

    // // Update user info.
    // marketsRef.child("personalInfo").update({
    //     firstName: info.marketInfo.firstName,
    //     lastName: info.marketInfo.lastName,
    //     email: info.marketInfo.email
    // });

    // // Update question responses.
    // marketsRef.child("questions").set(info.questions);
    // marketsRef.child("missedQuestions").set(info.betterQuestions);
}

module.exports = {getAllMarkets, getSpecificMarket, addNewMarket, updateExistingMarket};