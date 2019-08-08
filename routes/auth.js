// This create a table/collection in the database with name auth

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

// Check user status, get Signed In user info,
// Returns the user info based on the ID(jwt token payload while creating a new user or login).
// Private access with Token validation(auth middleware)
// Use get method

router.get('/', auth, async (req, res) => {
  try {
    // get user info from database exclude password using the passed ID.
    // req.user is passed from the auth middleware
    // Return the logged in user info based on the ID

    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'Server authentication error' });
  }
});

// Let user login
// Public access
// Use POST method
// return a token if success

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
      // find the email exist in the user table
      let user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ errors: 'Invalid email address. Credentials not matching' });

      // password match: compare with API input and db password after encryption
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: 'Invalid password. Credentials not matching' });

      // create a token on successful login. user._id is from database;
      // this ID is the data for future reference when we fetch items related to a user
      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send('Server error, could not login.');
    }
  }
);

// Let user SignOut
// Public access
// Use get method

router.get('/logout', (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ msg: 'Server authentication error-Logout' });
  }

  res.send(`I'm logged out`);
});

module.exports = router;
