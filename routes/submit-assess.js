const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/new-market', function(req, res) {
    const info = JSON.parse(req.body.data);
    db.addNewMarket(info);
});

router.post('/existing-market', function(req, res) {
    const info = JSON.parse(req.body.data);
    db.updateExistingMarket(info);
});

module.exports = router;