const mongoose = require('mongoose');
const conn = require('../connection');

const ProjectSchema = new mongoose.Schema({
  projectName: String,
  technologies: String,
  description: String,
  demoLink: String,
  githubLink: String,
  fullscreenfilename: String,
  smallscreenfilename: String,
});

module.exports = conn.model('Project', ProjectSchema);
