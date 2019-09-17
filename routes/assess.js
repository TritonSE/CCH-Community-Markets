var express = require('express');
var firebase = require('firebase');
var config = require('./config.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	
	if(!firebase.apps.length) {
     firebase.initializeApp(config.info());
	}

	// Setup database communication.
	let db = firebase.database();
	let ref = db.ref("live_weller");

	// Move to sub-directory.
	let marketsRef = ref.child("markets");
	let data = "";

	marketsRef.once('value', function(snapshot) {
   	snapshot.forEach(function(childSnapshot) {
   		let childKey = childSnapshot.key;
      	let childData = childSnapshot.val();
			
			let markup = "<option>" + childKey + "</option>";
			data += markup;
   	});

		data += "<option>" + "NEW MARKET" + "</option>";		 	
		res.render('assess', {data: data});
	});

});

module.exports = router;
