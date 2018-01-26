var express = require('express');
var EventModel = require('../models/Event');
var router = express.Router();

router.get('/all', function(req, res, next) {
    const query = EventModel.find();
    query.exec((err, data) => {
        res.json(data);
        res.end();
    });
});
module.exports = router;
