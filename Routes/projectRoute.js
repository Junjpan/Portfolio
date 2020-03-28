const Router = require('express').Router();
const verifyToken = require('./verifyToken');

Router.get('/edit', verifyToken, (req, res) => {
  res.send('success');
});

module.exports = Router;
