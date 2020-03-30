const Router = require('express').Router();
const verifyToken = require('./verifyToken');

Router.post('/add', verifyToken, (req, res) => {
  console.log(req.body);
  res.send('success');
});

module.exports = Router;
