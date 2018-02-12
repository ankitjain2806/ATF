var express = require('express');
var router = express.Router();
var EventModel = require('../models/Event');
var User = require('../models/User');

router.post('/events/add-new-event', function (req, res, next) {

  if (req.body.name === null || req.body.name === undefined) {
    res.status(500).send({'error': 'cannot find the request body...'});
  }
  else {
    var event = new EventModel();
    event.name = req.body.name;
    event.description = req.body.description;
    event.stages = null;
    event.lastUpdated = null;
    event.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({"message": "Added Successfully"});
    });
  }
});

router.delete('/events/delete-event/:_id', function (req, res, next) {
  EventModel.findByIdAndRemove(req.params._id, function (err, data) {
    if (err)
      console.log(err);
    else {
      res.json({"message": "Deleted Successfully"});
      console.log(data);
    }
  });
});

router.put('/events/update-event/:_id', function (req, res, next) {
  EventModel.findById(req.params._id, function (err, event) {
    if (err)
      console.log(err);
    else {
      event.name = req.body.name || event.name;
      event.description = req.body.description || req.description;
      event.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({"message": "Updated Successfully"});
      });
    }
  });
});



//User Part

router.get('/users', function (req, res, next) {
    var query = User.find({});
    query.exec(query, function (err, doc) {
        if (err) {
            console.log(err);
        }
        res.json(doc);
        res.end();
    });
});


router.get('/users/getEvents/:userId', function (req, res, next) {
    var query = User.findById(req.params.userId).select({'events': 1}).populate('events.id');
    query.exec(query, function (err, doc) {
        res.json(doc);
        res.end();
    });
});


router.put('/users/block', function (req, res, next) {
    // we expect 2 things from front  end
    //1 = User id - req.body.userId
    //2 = Event id - req.body.eventId
    User.findById(req.body.userId, function (err, user) {
        if (err)
            console.log(err);
        else {
            var eventArray = user.events;
            //loop through events to find matching event & set isBlocked as true for that event
            for (var i = 0; i < eventArray.length; i++) {
                if (eventArray[i].eventId === req.body.eventId) {
                    eventArray[i].isBlocked = true;
                    break;
                }
            }
            user.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({"message": "Blocked Successfully"});
                res.end();
            });
        }
    });
});


module.exports = router;