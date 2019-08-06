// This is the table/collection name in the database for 'user';

const express = require('express');
const router = express.Router();

// Create a new user
// Public access api
// Use POST method

router.post('/new', (req, res) => {
  res.send('create my user info');
});

// View user info
// Private access only with token
// Use POST method

router.post('/view', (req, res) => {
  res.send('view my user info');
});

// Update user info
// Private access using Token
// Use PUT method

router.put('/update/:id', (req, res) => {
  res.send('updated my profile');
});

// Delete user info
// Private access using Token
// Use PUT method

router.delete('/delete/:id', (req, res) => {
  res.send('delete my profile');
});

module.exports = router;
