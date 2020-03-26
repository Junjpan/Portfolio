const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

Router.post('/login', (req, res) => {
  console.log(req.body);
  res.status(200);
});

Router.post('/register', async (req, res) => {
  // eslint-disable-next-line prefer-const
  let { username, password } = req.body;

  // eslint-disable-next-line prefer-const
  let user = await User.findOne({ username });

  if (user) {
    res.status(409).json({
      message: 'Sorry, this username has been registered already. Please use different username',
    });
  } else {
    password = await User.hashPassword(password);

    // eslint-disable-next-line no-unused-vars
    await User.create({ username, password }, (err, newuser) => {
      if (err) {
        res.status(404).json({
          message: 'Sorry, your registration is not set up succesfully. Please try again.',
        });
      } else {
        res.status(200).json({ message: 'Your admin account has been set up, you can login now.' });
      }
    });
  }
});

module.exports = Router;
