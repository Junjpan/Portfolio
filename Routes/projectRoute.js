const Router = require('express').Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const GridFsStream = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

const URL = process.env.DBA_URL;
const storage = new GridFsStorage({
  url: URL,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'images',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage }); // storage the images to the mongodb
// const upload = multer({dest: './uploads/'});// set the upload files location without storage enginee
const conn = require('../connection');
const verifyToken = require('./verifyToken');
const Project = require('../Models/Project');

// eslint-disable-next-line no-unused-vars
let gfs;
// eslint-disable-next-line no-unused-vars
conn.once('open', (err, _db) => {
  console.log('Connected to MongodDB...');
  gfs = GridFsStream(conn.db, mongoose.mongo);
  gfs.collection('images');
  if (err) {
    throw err;
  }
});

Router.post('/add', verifyToken, upload.array('projectimages', 2), (req, res) => {
  // multer set req.file -single file upload ;req.files->multi files upload, name inside the upload.array() need to match up the frontend fieldname
  // console.log(req.files);
  // console.log(req.body);
  const { projectName, technologies, description, demoLink, githubLink } = req.body;
  const fullscreenfilename = req.files[0].filename;
  const smallscreenfilename = req.files[1] ? req.files[1].filename : '';

  Project.create(
    {
      projectName,
      technologies,
      description,
      demoLink,
      githubLink,
      fullscreenfilename,
      smallscreenfilename,
    },
    (err, newProject) => {
      res.status(200).json({
        fullscreenfilename: newProject.fullscreenfilename,
        smallscreenfilename: newProject.smallscreenfilename,
      });
    },
  );
});

Router.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  gfs.files.findOne({ filename }, (err, image) => {
    console.log(image);
    if (image === null) {
      res.status(404).send('No such a image');
    } else {
      const readstream = gfs.createReadStream(image.filename); // get all the chuck information for this image file
      readstream.pipe(res); // return image's base64 information to response
      res.send('success');
    }
  });
});

module.exports = Router;
