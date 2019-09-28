const firebase = require('firebase');

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const db = firebase.database().ref("live_weller").child("markets");

function exportAllMarkets() {
    return db.once('value');
}

exports.exportAllMarkets = exportAllMarkets;