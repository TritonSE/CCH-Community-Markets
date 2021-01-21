const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

function isAuthorized(req, res, next) {
  if (req.cookies.token) next();
  else res.render('auth');
}

/**
 * Generate key to access markets with.
 * @param { Market Name }    name    Market's name.
 * @param { Market Address } address Market's address.
 */
function generateKey(name, address) {
  const key = `${name.replace(/[^0-9a-zA-Z, ]/gi, '')}, ${address.replace(/[^0-9a-zA-Z, ]/gi, '')}`;
  return key.trim();
}

// Load full table of markets.
router.get('/', isAuthorized, (req, res, next) => {
  const markets = [];
  db.getAllMarkets().then((allMarkets) => {
    for (const key in allMarkets) {
      const childData = allMarkets[key].marketInfo;
      // If this information is not present, generateKey will cause a crash
      if (childData.marketName == null || childData.address == null) {
        log.error(`Market missing critical information: ${JSON.stringify(childData)}`)
        continue;
      }
      markets.push({
        name: childData.marketName,
        address: childData.address,
        size: childData.storeType,
        zip: childData.zip,
        level: childData.marketLevel,
        key: generateKey(childData.marketName, childData.address),
      });
    }

    res.render('markets', { markets });
  }).catch((error) => {
    log.error(error);
  });
});

// Load single market's information.
router.get('/:marketKey', (req, res, next) => {
  db.getSpecificMarket(req.params.marketKey).then((market) => {
    let status = `Questions to fix to get to level ${parseInt(market.marketInfo.marketLevel, 10) + 1}`;
    if (market.marketInfo.marketLevel === 3) {
      status = 'Market is at Top Level!';
    }

    const questions = [];
    for (const key in market.questions) {
      if (key !== 'undefined') {
        questions.push({ key, answer: market.questions[key] });
      }
    }

    const missed = [];
    for (const key in market.missedQuestions) {
      const question = market.missedQuestions[key];
      missed.push({ key: question });
    }

    res.render('market', {
      name: market.marketInfo.marketName,
      level: market.marketInfo.marketLevel,
      address: market.marketInfo.address,
      size: market.marketInfo.storeType,
      first: market.lastAssessedBy.firstName,
      last: market.lastAssessedBy.lastName,
      email: market.lastAssessedBy.email,
      status,
      questions,
      missed,
    });
  }).catch((error) => {
    log.error(error);
  });
});

router.delete('/:marketKey', (req, res, next) => {
  db.deleteMarket(req.params.marketKey);
  res.sendStatus(200);
});

module.exports = router;
