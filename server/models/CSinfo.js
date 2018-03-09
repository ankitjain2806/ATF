var mongoose = require('mongoose');

var CSinfoSchema = new mongoose.Schema({
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    teamName : String,
    members: [new mongoose.Schema({
        email : String,
        _id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    })]
});

var CSinfo = mongoose.model('CSinfo', CSinfoSchema);
module.exports = CSinfo;
