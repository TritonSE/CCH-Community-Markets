const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  _id: String,
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
  },
  marketInfo: {
    marketName: String,
    storeType: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    marketLevel: Number,
  },
  questions: Object,
  missedQuestions: [String],
});
const Market = mongoose.model('Market', marketSchema);

module.exports = { Market };
