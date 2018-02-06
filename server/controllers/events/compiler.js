var express = require('express');
var EventModel = require('../../models/Event');
var User = require('../../models/User');
var router = express.Router();
var async = require('async');
var request = require('request');

router.post('/run', function (req, res, next) {
    console.log("in the unnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    var code = req.body.code.replace(/(\n\t|\n|\t)/gm," ");
    console.log(code);
    var options = {
        method: 'POST',
        url: 'https://run.glot.io/languages/java/latest',
        headers: {
            'Authorization': 'Token 9b90f202-6a45-451d-bc8f-7a72707242c0',
            'Content-type': 'application/json'
        },
        json: {"files": [{"name": "main.java", "content": code
            }]
        }
    }

    function callback(error, response, body) {
        // console.log('callback');
        // console.log(error);
        //console.log('statusCode:', response && response.statusCode);
        //console.log(error);
        //console.log(body);
        //console.log(response.statusCode);
        if (!error && response.statusCode == 200) {

            //console.log('success');
            //console.log(response.body);
            res.json(response.body);
        }
    }
    request(options, callback);
});


module.exports = router;