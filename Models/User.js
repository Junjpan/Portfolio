const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const conn = require('../connection');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// this method will require you to do the async and await in the routes
UserSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 10);
};

// if you use 'this' here, make sure don't use arrow function
// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = conn.model('User', UserSchema);
