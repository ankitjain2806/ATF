var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var THResourceSchema = new Schema({
  title: String,
  body: String,
  options: [String],
  answer: String,
  hint: String,
  isMCQ: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
});
var THResource = mongoose.model('THResource', THResourceSchema);
module.exports = THResource;