const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

require('dotenv').config();

Router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user === null) {
        res.status(404).json({ message: 'No such a user.' });
      }
      return user.comparePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        res.status(400).json({ message: 'Incorrect Password.' });
      }
      jwt.sign(
        { username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRY },
        (_err, token) => {
          res.status(200).json({ token });
        },
      );
    })
    // eslint-disable-next-line no-unused-vars
    .catch(_err => {
      res.status(400).json({ message: 'something went wrong in the system.' });
    });
});

Router.post('/register', async (req, res) => {
  // eslint-disable-next-line prefer-const
  let { username, password, invitationkey } = req.body;

  // eslint-disable-next-line prefer-const
  let user = await User.findOne({ username });
  if (invitationkey !== process.env.INVITATIONKEY) {
    res
      .status(403)
      .json({
        message: `You don't have a valid invitation key, please contact the administrator to receive one.`,
      });
  } else if (user) {
    res.status(409).json({
      message: 'Sorry, this username has been registered already. Please use different username',
    });
  } else {
    password = await User.hashPassword(password);

    // eslint-disable-next-line no-unused-vars
    await User.create({ username, password }, (err, _newuser) => {
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
