var mongoose = require('mongoose');
var TeamSchema = new mongoose.Schema({
  teamName: String,
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});
var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
