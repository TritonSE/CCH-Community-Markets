const env = process.env.NODE_ENV || 'development';
const isDevelopment = env !== 'production';
if (isDevelopment) require('dotenv').config();

module.exports = {
  isDevelopment,

  port: process.env.PORT || 3000,

  logging: {
    level: 'info',
  },

  db: {
    uri: process.env.MONGO_URI,
    db: process.env.MONGO_DB,
    markets: process.env.MARKETS_COLLECTION,
    users: process.env.USERS_COLLECTION
  },

  firebase: {
    apiKey: 'AIzaSyB33kxrp6W3dihuRRFhgk2UFI9VSHCQvtI',
    authDomain: 'live-weller.firebaseapp.com',
    databaseURL: 'https://live-weller.firebaseio.com',
    projectId: 'live-weller',
    storageBucket: 'live-weller.appspot.com',
    messagingSenderId: '147602049424',
  },
};
