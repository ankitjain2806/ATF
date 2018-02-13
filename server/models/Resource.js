var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  name: String,
  body: String,
  testCases: [{
    stdin: String,
    stdout: String
  }],
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  isActive: {type: Boolean, default: true},
});
var Resource = mongoose.model('Resource', ResourceSchema);
module.exports = Resource;