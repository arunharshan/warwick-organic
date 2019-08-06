// Use capatilized file name 'User.js' which represent user router.
// This file defines the modal/schema for the database table - user

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 'user' is the name which is used to represent the UserSchema outside
module.exports = mongoose.model('user', UserSchema);
