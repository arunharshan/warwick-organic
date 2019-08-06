// This is the table/collection name in the database for 'user';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const user = require('../models/User'); // get user modal

// Create a new user
// Public access api
// Use POST method

router.post(
  '/new',
  [
    check('name', 'Name should be min of 3 characters').isLength({ min: 3 }),
    check('email', 'Invaid email format').isEmail(),
    check('password', 'Password should be min of 5 characters').isLength({
      min: 5
    })
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    // fetch input from the API request param
    const { name, email, password } = req.body;
    try {
      // check if the email already exist in the database
      let isEmailExist = await user.findOne({ email });
      if (isEmailExist)
        return res.status(400).json({ msg: 'The email is already taken.' });

      saveNewUser = new user({
        email,
        name,
        password
      });
      // encrypt password. alt method instead of using 10 is: await bcrypt.genSalt(10);
      saveNewUser.password = await bcrypt.hash(password, 10);

      // save to user table
      await saveNewUser.save();

      // Inorder to create a JWT toke we need to create a payload, pass secret from default.json
      // this ID is the data for future reference when we fetch items related to a user
      const payload = {
        user: {
          id: saveNewUser._id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      ); // 3600 in production or optional filed.
    } catch (error) {
      console.log('--Sever error--', error.message);
      res.status(500).send('Server error, could not save new user info.');
    }
  }
);

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
