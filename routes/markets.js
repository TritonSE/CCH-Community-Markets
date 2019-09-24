var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('./config.js');

if(!firebase.apps.length){
	firebase.initializeApp(config.config);
}
const db = firebase.database();

router.get('/', function(req, res, next) {
	res.render('markets');
});

module.exports = router;
