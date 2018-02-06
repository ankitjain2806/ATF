var express = require('express');
var router = express.Router();
var EventModel = require('../models/Event');

router.post('/add-new-event', function (req, res, next) {

    if(req.body.name === null || req.body.name === undefined) {
        res.status(500).send({'error': 'cannot find the request body...'});
    }
    else{
        var event = new EventModel();
        event.name = req.body.name;
        event.description = req.body.description;
        event.stages = null;
        event.lastUpdated = null;
        event.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({"message":"Added Successfully"});
        });
    }
});

router.delete('/delete-event/:_id', function (req, res, next) {
    EventModel.findByIdAndRemove(req.params._id, function (err, data) {
            if(err)
                console.log(err);
            else{
                res.json({"message":"Deleted Successfully"});
                console.log(data);
            }
        });
});

router.put('/update-event/:_id', function (req, res, next) {
    EventModel.findById(req.params._id, function (err, event) {
        if(err)
            console.log(err);
        else{
            event.name = req.body.name || event.name;
            event.description = req.body.description || req.description;
            event.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({"message":"Updated Successfully"});
            });
        }
    });
});

module.exports = router;