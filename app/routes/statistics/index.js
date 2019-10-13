const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

function isAuthorized(req, res, next) {
  if (req.cookies.token) next();
  else res.render('auth');
}

router.get('/', isAuthorized, (req, res, next) => {
  res.render('statistics');
});

router.get('/general', (req, res) => {
  /* Levels chart */
  const levels = [0, 0, 0, 0];

  /* Store Type chart */
  const stores = {
    small: 0,
    medium: 0,
    large: 0,
    convenience: 0,
  };

  db.getAllMarkets().then((markets) => {
    for (const key in markets) {
      levels[parseInt(markets[key].marketInfo.marketLevel, 10)] += 1;
      stores[markets[key].marketInfo.storeType.toLowerCase()] += 1;
    }

    res.json({ levels, stores });
  }).catch((error) => {
    log.error(error);
  });
});

router.post('/question', (req, res) => {
  const strippedKey = req.body.title.replace(/[^0-9a-zA-Z, ]/gi, '');
  const questionResults = [];
  const uniqueResults = {};

  db.getAllMarkets().then((markets) => {
    for (const key in markets) {
      const question = markets[key].questions[strippedKey];
      if (question) {
        uniqueResults[question] = 0;
        questionResults.push(question);
      }
    }

    res.json({ questionResults, uniqueResults });
  }).catch((error) => {
    log.error(error);
  });
});

module.exports = router;
