const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('auth');
});

router.post('/login', (req, res, next) => {
	const credentials = "" + req.body.email + req.body.password;
	db.signInUser(credentials).then((userDetails) => {
		//user found
		if(userDetails.length != 0) {
			res.cookie('token', req.body.email, {path: '/'});
			res.jsonp({ success: true });
		}

		else{
			res.jsonp({ success: false });
		}

	}).catch((error) => {
		log.error(error);
	});
});

// checks if signed in for the navbar
router.get('/checkIfSignedIn', (req, res, next) => {
  if (req.cookies.token) res.jsonp({ signedIn: true });
  else res.jsonp({ signedIn: false });
});


// logs out user
router.post('/signOut', (req, res, next) => {
  res.clearCookie('token', { path: '/' }).send('logged out');
});

module.exports = router;
