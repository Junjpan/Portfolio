const Router = require('express').Router();
const multiparty = require('multiparty');
// let fs = require('fs');  file system module, common use for the file system module is read/create/update/delete/rename files
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
const verifyToken = require('./verifyToken');
// const { gfs } = require('../index');
const Project = require('../Models/Project');

Router.post('/add', verifyToken, (req, res) => {
  console.log(req.files);
  let form = new multiparty.Form();

  form.parse(req, (err, formdata, files) => {
    console.log(formdata);
    console.log(files);
  });

  res.send('success');
});

module.exports = Router;
