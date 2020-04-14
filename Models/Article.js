const mongoose = require('mongoose');
const conn = require('../connection');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  link: { type: String, required: true },
  text: String,
});

module.exports = conn.model('Article', ArticleSchema);
