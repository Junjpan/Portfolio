/* eslint-disable no-param-reassign */
const Router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ dest: './uploads/' }); // set the upload files location without storage enginee
const verifyToken = require('./verifyToken');
const retrieveURL = require('./retrieveURL');
const Project = require('../Models/Project');

require('dotenv').config();

cloudinary.config({
  cloud_name: 'dksmtex8g',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

Router.post('/add', verifyToken, upload.array('projectimages', 2), async (req, res) => {
  // multer set req.file -single file upload ;req.files->multi files upload, name inside the upload.array() need to match up the frontend fieldname
  // console.log(req.files); there is a path for each uploaded fiile, you have to pass the path to cloudinar.uploader to get the result.

  /** 
  function retrieveURL(filepath) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(filepath, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.url);
      });
    });
  } */

  const { projectName, technologies, description, demoLink, githubLink } = req.body;
  const fullscreenlink = req.files[0] ? await retrieveURL(req.files[0].path) : '';
  const smallscreenlink = req.files[1] ? await retrieveURL(req.files[1].path) : '';

  Project.create(
    {
      projectName,
      technologies,
      description,
      demoLink,
      githubLink,
      fullscreenlink,
      smallscreenlink,
    },
    (_err, newProject) => {
      res.status(200).json({
        fullscreenlink: newProject.fullscreenlink,
        smallscreenlink: newProject.smallscreenlink,
        message: 'You App has been uploaded.',
      });
    },
  );
});

Router.patch(
  '/edit/:projectId',
  verifyToken,
  upload.fields([{ name: 'editFullImages' }, { name: 'editMobileImages' }]),
  async (req, res) => {
    const { projectId } = req.params;
    const { projectName, technologies, description, demoLink, githubLink } = req.body;
    const fullscreenlink =
      req.files.editFullImages !== undefined
        ? await retrieveURL(req.files.editFullImages[0].path)
        : 'undefined';
    const smallscreenlink =
      req.files.editMobileImages !== undefined
        ? await retrieveURL(req.files.editMobileImages[0].path)
        : 'undefined';

    Project.findById(projectId, (_err, project) => {
      if (project === null) {
        res.status(404).json({ message: 'Sorry, this project is not in the system' });
      } else {
        project.projectName = projectName;
        project.technologies = technologies;
        project.description = description;
        project.demoLink = demoLink;
        project.githubLink = githubLink;

        if (fullscreenlink !== 'undefined') {
          project.fullscreenlink = fullscreenlink;
        }
        if (smallscreenlink !== 'undefined') {
          project.smallscreenlink = smallscreenlink;
        }

        project.save(() => {
          res.status(200).send({ message: 'This project has been updated!' });
        });
      }
    });
  },
);

Router.get('/all', (_req, res) => {
  Project.find({})
    .sort({ date: -1 })
    .then(projects => {
      res.status(200).json({ projects });
    })
    // eslint-disable-next-line no-unused-vars
    .catch(_err => {
      res.status(400).json({ message: 'Something wrong with server...' });
    });
});

module.exports = Router;

/** This is when you decide to upload the image to the mongoDB.

const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
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

const upload=multer({storage})
*/
// const upload=multer({}), you can see all the buffer information to the req.files as well.
