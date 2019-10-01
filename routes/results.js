const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('results');
});

router.get('/:name/:level', function(req, res, next) {
	res.render('results', {name: req.params.name, level: req.params.level});
});

module.exports = router;
