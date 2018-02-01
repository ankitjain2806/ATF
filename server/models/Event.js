var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var EventSchema = new Schema({
    name: String,
    description: String,
    stages: [
        new Schema({
            question: String,
            type: String
        }, {strict: false})
    ],
    lastUpdated: { type: Date, default: Date.now }
}, {strict: false});
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
