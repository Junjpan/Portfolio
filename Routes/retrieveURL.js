const cloudinary = require('cloudinary').v2;

function retrieveURL(filepath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filepath, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.url);
    });
  });
}

module.exports = retrieveURL;
