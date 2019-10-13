const express = require('express');
const db = require('../db');
const log = require('../logger');

const router = express.Router();

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
      const question = market.missedQuestions[key].replace('<span class="boldanswer">', '').replace('</span>', '');
      missed.push({ key: question });
    }

    res.render('marketdata', {
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

module.exports = router;
