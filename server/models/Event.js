var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

var TeamSchema = new Schema({
  teamName: String,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

/*
var StageSchema = new Schema({
  question: String,
  type: String
}, {strict: false})*/

var EventSchema = new Schema({
  name: String,
  slug: String,
  description: String,
  // stages: [StageSchema],
    stages :Number,
  lastUpdated: {type: Date, default: Date.now},
  memberCount: Number,
  teams: [TeamSchema]
}, {strict: false});
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
