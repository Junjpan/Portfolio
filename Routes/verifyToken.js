const verifyToken = (req, res, next) => {
  console.log(req.headers['Authentication']);
};

module.exports = verifyToken;
