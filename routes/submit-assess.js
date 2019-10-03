const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', function(req, res) {
    const info = JSON.parse(req.body.data);
    if (info.new === true) db.addNewMarket(info);
    else db.updateExistingMarket(info);
});

module.exports = router;