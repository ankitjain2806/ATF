var events = require('./events');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ATF', {});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

function simulation() {
    events();
}

simulation();