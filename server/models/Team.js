var mongoose = require('mongoose');
var TeamSchema = new mongoose.Schema({
    name:String,
    event_id : Number,
    members :[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});
var Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
