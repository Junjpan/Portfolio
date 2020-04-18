const mongoose = require('mongoose');
const conn = require('../connection');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  link: { type: String, required: true },
  source: String,
});

module.exports = conn.model('Article', ArticleSchema);
