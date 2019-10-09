const express = require('express');
const db = require('../db');
const log = require('../logger');

const router = express.Router();

router.get('/', (req, res, next) => {
  db.getAllMarkets().then((markets) => {
    const marketOptions = [];

    for (const key in markets) {
      marketOptions.push({ marketName: key });
    }

    marketOptions.push({ marketName: 'NEW MARKET' });
    res.render('assess-market', { marketOptions });
  }).catch((error) => {
    log.error(error);
  });
});

module.exports = router;
