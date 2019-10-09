const express = require('express');

const router = express.Router();

router.get('/:name/:level', (req, res, next) => {
  res.render('results', { name: req.params.name, level: req.params.level });
});

module.exports = router;
