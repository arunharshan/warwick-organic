const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // fetched form config/default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
    console.log('-- MongoDB connected, warwick organic --');
  } catch (error) {
    console.log('-- Error connecting MongoDB, warwick organic - ', error);
  }
};

module.exports = connectDB;
