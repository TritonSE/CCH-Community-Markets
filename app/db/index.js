const mongoose = require('mongoose');
const config = require('../config');
const { Market } = require('./models/market');

mongoose.connect(config.db.uri, { useUnifiedTopology: true, useNewUrlParser: true });


/**
 * By calling this method and using .then() for the callback, you can access
 * the entire list of markets in JSON format.
 *
 * This returns a Promise so that once the database values are secured, they can
 * be worked with in a different location/file.
 */
function getAllMarkets() {
  return Market.find({}).exec();
}

/**
 * By calling this method and using .then() for the callback, you can access
 * a single market's information in JSON format.
 *
 * This returns a Promise so that once the database values are secured, they can
 * be worked with in a different location/file.
 */
function getSpecificMarket(name) {
  return Market.findOne({ _id: name }).exec();
}

function generateKey(name, address) {
  // Make sure illegal characters removed from key.
  return (`${name}, ${address}`).replace(/[^0-9a-zA-Z, ]/gi, '').trim();
}

/**
 * If the user selected "NEW MARKET" on the assessment page, this method is
 * called to upload the market to the database.
 * @param {*} info All question answers from the assessment page.
 */
function addNewMarket(info) {
  const marketName = generateKey(info.marketInfo.marketName, info.marketInfo.address);

  // Add a new child to the markets reference in the database.
  Market.create({
    _id: marketName,
    lastAssessedBy: {
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
      marketLevel: info.level,
    },
    questions: info.questions,
    missedQuestions: info.betterQuestions,
  });
}

/**
 * If the user selected an existing market to fill out a new evaluation for,
 * this method is called to update its answers and level.
 * @param {*} info All question answers from the assessment page.
 */
function updateExistingMarket(info) {
  Market.findOneAndUpdate({ _id: info.marketInfo.marketName },
    { $set: {
      lastAssessedBy: {
        firstName: info.marketInfo.firstName,
        lastName: info.marketInfo.lastName,
        email: info.marketInfo.email,
      },
      'marketInfo.marketLevel': parseInt(info.level, 10),
      questions: info.questions,
      missedQuestions: info.betterQuestions,
    } }).exec();
}

/**
 * Given a key, delete it from the list of markets.
 * @param {*} marketKey
 */
function deleteMarket(marketKey) {
  Market.findByIdAndDelete({ _id: marketKey }).exec();
}

module.exports = { getAllMarkets, getSpecificMarket, addNewMarket, updateExistingMarket, deleteMarket };
