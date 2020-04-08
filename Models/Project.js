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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = conn.model('Project', ProjectSchema);
