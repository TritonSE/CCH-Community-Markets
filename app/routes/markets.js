const express = require('express');
const db = require('../db');

const router = express.Router();

function generateKey(name, address) {
  const key = `${name.replace(/[^0-9a-zA-Z, ]/gi, '')}, ${address.replace(/[^0-9a-zA-Z, ]/gi, '')}`;
  return key.trim();
}

router.get('/', isAuthorized, (req, res, next) => {
  const markets = [];
  db.getAllMarkets().then((allMarkets) => {
    for (const key in allMarkets) {
      const childData = allMarkets[key].marketInfo;
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
    console.log(error);
  });
});

function isAuthorized(req, res, next) {
  if (req.cookies.token) {
    next();
  } else {
    res.render('admin-login');
  }
}
module.exports = router;
