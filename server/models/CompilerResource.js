var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompilerResourceSchema = new Schema({
  name: String,
  body: String,
  testCases: [{
    stdin: String,
    stdout: String
  }],
  isActive: {type: Boolean, default: false},
  isCurrent: {type: Boolean, default: false},
  day: Number
});
var CompilerResource = mongoose.model('CompilerResource', CompilerResourceSchema);
module.exports = CompilerResource;