const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const conn = require('../connection');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 10);
};

UserSchema.methods.comparePassword = password => {
  return bcrypt.compare(password, this.password);
};

module.exports = conn.model('User', UserSchema);
