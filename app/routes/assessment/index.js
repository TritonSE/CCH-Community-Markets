const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

// Load form page for assessment.
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

// Load results page for assessment.
router.get('/results/:name/:level', (req, res, next) => {
  res.render('assessment-results', { name: req.params.name, level: req.params.level });
});

// Post request to update database.
router.post('/assessment', (req, res) => {
  const info = req.body.data;
  if (info.new === true) db.addNewMarket(info);
  else db.updateExistingMarket(info);
  res.json({ error: null });
});

module.exports = router;
