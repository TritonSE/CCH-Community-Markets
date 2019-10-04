const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const info = JSON.parse(req.body.data);
  if (info.new === true) db.addNewMarket(info);
  else db.updateExistingMarket(info);
});

module.exports = router;
