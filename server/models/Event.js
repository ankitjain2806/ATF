var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var EventSchema = new Schema({
    name: String,
    description: String,
    lastUpdated: { type: Date, default: Date.now }
});
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
