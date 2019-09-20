var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('./config.js');

if(!firebase.apps.length){
	firebase.initializeApp(config.config);
}

router.get('/', function(req, res, next) {
	res.render('admin-login');
});

router.post('/', signIn, function(req, res) {
	//checks if user is signed in
	if(firebase.auth().currentUser){
		res.jsonp({success: true});
		res.end();
	}

	//sign in unsuccessful
	else{
		res.jsonp({success: false});
		res.end();
	}
});

//this method gets called before function body inside router.post
function signIn(req, res, next){
	const email = req.body.email
	const password = req.body.password;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		//sign in unsuccessful
		console.log("invalid credential")
	});

	//set 1.2 second timeout so that above method can finish before moving on
	setTimeout(next, 1200);
}

//checks if signed in for the navbar 
router.post('/checkIfSignedIn', function(req, res){
	if(firebase.auth().currentUser){
		res.jsonp({signedIn: true});
		res.end();
	}

	else{
		res.jsonp({signedIn: false});
		res.end();
	}
});


//logs out user
router.post('/signOut', function(req, res){
	firebase.auth().signOut();
});
module.exports = router;
