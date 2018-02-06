var mongoose = require('mongoose');
var TeamSchema = new mongoose.Schema({
  teamName: String,
  captain: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});
var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
