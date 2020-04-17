/* eslint-disable no-param-reassign */
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

Router.get('/articles/:_id', (req, res) => {
  const { _id } = req.params;
  Technical.findById(_id)
    .populate({ path: 'articalsArr', model: Article })
    .then(tech => {
      res.status(200).send({ info: tech });
    })
    .catch(err => {
      res.status(404).send({ message: 'Something wrong with server.' });
    });
});

Router.post('/articles/add/:_id', verifyToken, (req, res) => {
  const { _id } = req.params;
  const { title, link, source, date } = req.body;
  Article.create({ title, link, source, date }, (err, newArt) => {
    if (err) {
      res.status(404).json({ message: 'Something wrong with the server' });
    }
    Technical.findById(_id, (error, tech) => {
      if (error) {
        res.status(404).json({ message: 'Something wrong with the server' });
      }
      tech.articalsArr.push(newArt._id);
      tech.save(() => {
        res.send('success');
      });
    });
  });
});

Router.post('/changename/:_id', verifyToken, (req, res) => {
  const { _id } = req.params;
  const { subject } = req.body;

  Technical.findById(_id, (err, tech) => {
    if (err) {
      res.status(404).send({ message: 'Something wrong with server, please try again.' });
    }
    tech.subject = subject;
    tech.save(() => {
      res.status(200);
    });
  });
});

Router.delete('/article/:_id', (req, res) => {
  const { _id } = req.params;
  const { techId } = req.body;
  console.log(req.body);

  Article.deleteOne({ _id }, (err, _result) => {
    if (err) {
      res
        .status(400)
        .json({ message: "Article wasn't able to be deleted, please try again later" });
    }
    Technical.findById(techId, (_err, tech) => {
      const index = tech.articalsArr.indexOf(_id);
      tech.articalsArr.splice(index, 1);
      tech.save();
    });
    res.status(200).json({ message: 'Article has been deleted.' });
  });
});
module.exports = Router;
