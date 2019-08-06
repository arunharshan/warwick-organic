//This is the entry point of Express

const express = require('express');

const app = express();

// ******* API URL SET-UP FOR OUTSIDE WORLD ACCESS  ******* //

// API endpoint 'http://localhost:5000/'

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the store app.' });
});

// API for user actions
// Endpoints are defined in the user routes
// http://localhost:5000/api/user/...

app.use('/api/user', require('./routes/user'));

// API for Login action
// Endpoints are defined in the auth routes
// http://localhost:5000/api/auth/...

app.use('/api/auth', require('./routes/auth'));

// ******* PORT SETTIGNS  ******* //

// if no port is set then default is 5000

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
