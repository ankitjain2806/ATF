var express = require('express');
var router = express.Router();
var User = require('../models/User');
var responseHandler = require('../util/responseHandler').Response;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/events', function (req, res, next) {
  User.findById(req.session.user._id).select('events').populate('events.eventId').exec(function(err, events){
    console.log(events);
    var userEvents = events.events.map(function (event) {
      return event.eventId.slug;
    })
    res.locals.responseObj = {
      err: err,
      data: userEvents,
      msg: "users events"
    }
    next();
  });
},responseHandler);

module.exports = router;