const Router = require('express').Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const verifyToken = require('./verifyToken');
const { gfs } = require('../index');
const Project = require('../Models/Project');

Router.post('/add', verifyToken, (req, res) => {
  console.log(req.body);

  res.send('success');
});

module.exports = Router;
