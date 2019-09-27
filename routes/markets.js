var express = require('express');
var router = express.Router();

<<<<<<< HEAD
if(!firebase.apps.length){
	firebase.initializeApp(config.config);
}
const db = firebase.database();

=======
>>>>>>> parent of c7779cb... moved auth check to backend for markets and data section
router.get('/', function(req, res, next) {
	res.render('markets');
});

module.exports = router;
