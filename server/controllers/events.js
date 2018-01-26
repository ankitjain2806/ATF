var express = require('express');
var EventModel = require('../models/Event');
var router = express.Router();

router.get('/all', function(req, res, next) {
    /*const newEvent = new EventModel({
        name: 'Treasure Hunt',
        description: 'Hunt for treasure'
    });
    newEvent.save((err) => {
       if(err) {
           res['eeor'] = 'something is not working';
       }
        const query = EventModel.find();

    });*/
    const query = EventModel.find();
    query.exec((err, data) => {
        res.json(data);
        res.end();
    });
});
module.exports = router;
