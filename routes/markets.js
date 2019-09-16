var express = require('express');
var firebase = require('firebase');
var config = require('./config.js');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (!firebase.apps.length) {
		firebase.initializeApp(config.info());
	  }
	
	// Creates connection to database.
	var db = firebase.database();
	// Links to head of database.
	var ref = db.ref("live_weller");
	// Links to markets list.
	var marketsRef = ref.child("markets");

	var dbinfo = "";

	marketsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();

			var name = childData.marketInfo.marketName;
			var address = childData.marketInfo.address;
			var size = childData.marketInfo.storeType;
			var zip = childData.marketInfo.zip;
			var level = childData.marketInfo.marketLevel;
			
			var markup = "<tr><td>" + "<a id='turnblue' onclick='redirectFunction(this)'>"+name+"</a>" + "</td><td>" + address + 
						"</td><td>" + size + "</td><td>" + zip + 
						"</td><td>" + level + "</td><td><button class=\"mapButton\"" +
						"onclick=\"window.open('https://www.google.com/maps/dir/?api=1&destination=" + address + "')\">" + 
						"<p>Go!</p></button></td></tr>"
			dbinfo += markup;
		});

		res.render('markets', {marketList: dbinfo});
		// $('#table_id').DataTable();
	});
});

module.exports = router;
