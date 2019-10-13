const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

// app routes
router.use('/assessment', require('./assessment'));
router.use('/markets', require('./markets'));
router.use('/statistics', require('./statistics'));
router.use('/auth', require('./auth'));

module.exports = router;
