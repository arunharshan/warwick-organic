// This create a table/collection in the database with name auth

const express = require('express');
const router = express.Router();

// Let user login
// Public access
// Use POST method
// return a token if success

router.post('/login', (req, res) => {
  res.send(`I'm logged in`);
});

// Let user SignOut
// Public access
// Use get method

router.get('/logout', (req, res) => {
  res.send(`I'm logged out`);
});

module.exports = router;
