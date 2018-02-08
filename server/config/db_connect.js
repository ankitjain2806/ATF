// db_connect.js
var mongoose = require('mongoose');
var envConfig = require('../config/env');

mongoose.connect(envConfig.mongoURI, {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection initiated....')
});

module.exports = db;
