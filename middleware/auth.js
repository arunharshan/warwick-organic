// auth middleware is used to check the token passed through API header is valid,
// used to verify the accessed API urls are authorized. Eg: edit my profile

const jwt = require('jsonwebtoken');
const config = require('config');

// below function is a middleware
module.exports = (req, res, next) => {
  // get token from the API header.x-auth-token is a querysting parameter;can be any variable name
  const token = req.header('x-auth-token');

  //check the token present
  if (!token)
    return res
      .status(401)
      .json({ msg: 'No token found. Authorization denied' });

  // decode the token and verify using jwtSecrete
  // and replace/assign req.user with the payload of decoded 'user' info
  try {
    const decode = jwt.verify(token, config.get('jwtSecret'));
    console.log('decoded--', decode);
    req.user = decode.user;
    next(); // kind of return or jump to next
  } catch (error) {
    console.log('Server error- checking token', error);
    res.status(401).json({ msg: 'Invalid token. Authorization denied' });
  }
};
