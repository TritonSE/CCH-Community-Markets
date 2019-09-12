var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('admin-process');
});

module.exports = router;
