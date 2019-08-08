// Use capatilized file name 'Auth.js' which represent auth router.
// This file defines the modal/schema for the database table - auth

const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// 'auth' is the name which is used to represent the AuthSchema outside
module.exports = mongoose.model('Auth', AuthSchema);
