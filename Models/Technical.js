const mongoose = require('mongoose');
const conn = require('../connection');

const TechnicalSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  articalsArr: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});

module.exports = conn.model('Technical', TechnicalSchema);
