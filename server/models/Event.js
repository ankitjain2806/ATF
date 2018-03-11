var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  slug: String,
  description: String,
  lastUpdated: {type: Date, default: Date.now},
});
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
