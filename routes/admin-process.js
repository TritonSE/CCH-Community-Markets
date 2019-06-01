var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {
	res.render('admin-process', {config: {
	    apiKey: app.get('apiKey'),
	    authDomain: app.get('authDomain'),
	    databaseURL: app.get('databaseURL'),
	    projectId: app.get('projectId'),
	    storageBucket: app.get('storageBucket'),
	    messagingSenderId: app.get('messagingSenderId')
	}}
);
});

module.exports = router;
