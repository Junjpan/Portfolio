const mongoose = require('mongoose');
const conn = require('../connection');

const ProjectSchema = new mongoose.Schema({
  technologies: String,
  description: String,
  demoLink: String,
  githubLink: String,
  fullscreen: Buffer,
  smallscreen: Buffer,
});

module.exports = conn.model('Projects', ProjectSchema);
