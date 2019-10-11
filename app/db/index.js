const mongoose = require('mongoose');
const config = require('../config');
const { Market } = require('./models');

mongoose.connect(config.db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

/**
 * By calling this method and using .then() for the callback, you can access
 * the entire list of markets in JSON format.
 *
 * This returns a Promise so that once the database values are secured, they can
 * be worked with in a different location/file.
 */
function getAllMarkets() {
  return new Promise((resolve, reject) => {
    Market
      .find({})
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

/**
 * By calling this method and using .then() for the callback, you can access
 * a single market's information in JSON format.
 *
 * This returns a Promise so that once the database values are secured, they can
 * be worked with in a different location/file.
 */
function getSpecificMarket(name) {
  return new Promise((resolve, reject) => {
    Market
      .findOne({ _id: name })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
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

  const insert = {
    _id: marketName,
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
      marketLevel: info.level,
    },
    questions: info.questions,
    missedQuestions: info.betterQuestions,
  };

  // Add a new child to the markets reference in the database.
  Market.create(insert);
}

/**
 * If the user selected an existing market to fill out a new evaluation for,
 * this method is called to update its answers and level.
 * @param {*} info All question answers from the assessment page.
 */
function updateExistingMarket(info) {
  // Get current values to avoid overwriting current values.
  getSpecificMarket(info.marketInfo.marketName).then((market) => {
    const update = {
      personalInfo: {
        firstName: info.marketInfo.firstName,
        lastName: info.marketInfo.lastName,
        email: info.marketInfo.email,
      },
      marketInfo: {
        marketName: market.marketInfo.marketName,
        storeType: market.marketInfo.storeType,
        address: market.marketInfo.address,
        city: market.marketInfo.city,
        state: market.marketInfo.state,
        zip: market.marketInfo.zip,
        marketLevel: parseInt(info.level),
      },
      questions: info.questions,
      missedQuestions: info.betterQuestions,
    };

    // Send new and old values to update.
    Market.updateOne({ _id: info.marketInfo.marketName }, { $set: update });
  });
}

module.exports = { getAllMarkets, getSpecificMarket, addNewMarket, updateExistingMarket };
