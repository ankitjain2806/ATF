var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    description: String,
    lastUpdated: { type: Date, default: Date.now }
});
var User = mongoose.model('Event', EventSchema);
module.exports = User;
