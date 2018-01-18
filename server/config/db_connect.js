// db_connect.js
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/tambola';

mongoose.connect(mongoURI, {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection initiated....')
});

module.exports = db;
