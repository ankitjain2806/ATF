var serviceName = 'Transactions Service';
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ATF', {});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log( serviceName + 'connected to DB...');
});

const app = express();

app.get('/heartbeat', (req, res) => res.send(serviceName + ' is runnning...'));

const UserEventStateModel = require('../../models/UserEventState');
app.post('/user/update/points', function (req, res) {
    const query = UserEventStateModel.update({'user': req.user},
        {'$set': {'points': 10}},
        { 'upsert': true });
    query.exec(function (err, state) {
       if(err) {
           console.log('cannot update points... add this to some queue and try again ', err);
           return;
       }
       console.log('succesfully updated points... ', state);
    });
});

app.listen(3001, function () {
   console.log(serviceName + ' has started...on port', 3001);
});



