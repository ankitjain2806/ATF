var express = require('express');
var EventModel = require('../models/Event');
var TeamModel = require('../models/Team');

var router = express.Router();

router.get('/all', function (req, res, next) {
    var query = EventModel.find();
    query.exec(function (err, data) {
        res.json(data);
        res.end();
    });
});

router.post('/team-register', function (req, res, next) {
    const team = new TeamModel(req.body);
    team.save(function (err, team) {
        if (err) {
            res.json(err);
        } else {
            res.json({data: team, message: 'saved'});
        }
        res.end();
    });

});
module.exports = router;
