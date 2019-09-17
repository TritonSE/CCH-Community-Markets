var express = require('express');
var firebase = require('firebase');
var config = require('./config.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	
	if(!firebase.apps.length) {
     firebase.initializeApp(config.info());
	}

	// Setup database communication.
	var db = firebase.database();
	var ref = db.ref("live_weller");

	// Move to sub-directory.
	var marketsRef = ref.child("markets");
	var data = "";

	marketsRef.once('value', function(snapshot) {
   	snapshot.forEach(function(childSnapshot) {
   		var childKey = childSnapshot.key;
      	var childData = childSnapshot.val();
			
			var markup = "<option>" + childKey + "</option>";
			data += markup;
   	});

		data += "<option>" + "NEW MARKET" + "</option>";		 	
		res.render('assess', {data: data});
	});

});

module.exports = router;
