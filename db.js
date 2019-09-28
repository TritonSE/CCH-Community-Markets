const firebase = require('firebase');
const config = require('./config.js');

if (!firebase.apps.length) {
	firebase.initializeApp(config.config);
}

const db = firebase.database().ref("live_weller").child("markets");

function exportAllMarkets() {
    return db.once('value');
}

exports.exportAllMarkets = exportAllMarkets;