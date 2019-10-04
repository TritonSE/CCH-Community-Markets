const express = require('express');
const firebase = require('firebase');
const config = require('../config');

const router = express.Router();

if (!firebase.apps.length) firebase.initializeApp(config.firebase);

router.get('/', (req, res, next) => {
  res.render('admin-login');
});

router.post('/login', (req, res, next) => {
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(() => {
    res.cookie('token', req.body.email, { path: '/' });
    res.jsonp({ success: true });
  }).catch((error) => {
    console.log('invalid credentials');
    res.jsonp({ success: false });
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
