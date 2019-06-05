var express = require('express');
var router = express.Router();
var app = express();

console.log("hello");

router.get('/', function(req, res, next) {
	console.log(req.app.get('test'));
	console.log("yo");
	res.render('admin-process');
});

module.exports = router;
