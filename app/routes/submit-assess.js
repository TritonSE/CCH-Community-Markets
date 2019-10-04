const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const info = req.body.data;
  if (info.new === true) db.addNewMarket(info);
  else db.updateExistingMarket(info);
  res.json({ error: null });
});

module.exports = router;
