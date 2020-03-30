const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authentication;
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      // since I didn't install passport, so I can't'compare the req.user with the data.username.
      // if token was changed from the localstorage, date will be 'undefined'
      // if token is expired, data will also be undefined.
      if (err || data === undefined) {
        res.status(403).json({ message: 'Sorry, you are forbidden. Login and try again.' });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ message: 'Sorry, you are forbidden. Login and try again.' });
  }
};

module.exports = verifyToken;
