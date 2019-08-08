// This is the table/collection name in the database for 'user';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User'); // get user modal

const auth = require('../middleware/auth');

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
      let isEmailExist = await User.findOne({ email });
      if (isEmailExist)
        return res.status(400).json({ msg: 'The email is already taken.' });

      saveNewUser = new User({
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
      res.status(500).send('Server error, could not save new user info.');
    }
  }
);

// View user info
// Private access only with token
// Use GET method
// you can resuse the /auth router instead of /user/view

router.get('/view', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'Server authentication error' });
  }
});

// Update user info
// Private access using Token
// Use PUT method

router.put('/update/:id', auth, async (req, res) => {
  const { name, email, password } = req.body;

  // create a new object with new input values
  const updatedUserFileds = {};
  if (name) updatedUserFileds.name = name;
  if (email) updatedUserFileds.email = email;
  if (password) updatedUserFileds.password = await bcrypt.hash(password, 10);

  try {
    // validate the API passed param ID is matching with DB user ID
    let user = await user.findById(req.params.id);
    if (!user)
      return res.status(404).json({ msg: 'unable to find the user info' });

    // Check the authorized person is performing the edit

    if (users.id.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'unauthorized user access' });
    }

    user = await User.findByIdAndUpdate(req.params.id, {
      $set: updatedUserFileds
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete user info
// Private access using Token
// Use PUT method

router.delete('/delete/:id', async (req, res) => {
  res.send('delete my profile');
  user = await User.findByIdAndRemove(req.params.id);
});

module.exports = router;
