const mongoose = require('mongoose');
const conn = require('../connection');

const ProjectSchema = new mongoose.Schema({
  projectName: String,
  technologies: String,
  description: String,
  demoLink: String,
  githubLink: String,
  fullscreenlink: String,
  smallscreenlink: String,
});

module.exports = conn.model('Project', ProjectSchema);
