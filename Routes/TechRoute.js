/* eslint-disable no-unused-vars */
const Router = require('express').Router();
const verifyToken = require('./verifyToken');
const Technical = require('../Models/Technical');
const Article = require('../Models/Article');

Router.post('/add', verifyToken, (req, res) => {
  const { subject } = req.body;

  Technical.create({ subject }, (err, newTech) => {
    if (err) {
      res.status(404).send({ message: 'Something wrong with server. try again later' });
    } else {
      res.status(200).send({ message: 'Subject has been added.' });
    }
  });
});

Router.get('/all', (req, res) => {
  Technical.find({}, (err, technicals) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ technicals });
  });
});

module.exports = Router;
