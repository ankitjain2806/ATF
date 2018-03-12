var EventModel = require('../models/Event');
//var UserEventStateModel = require('../models/UserEventState');
var THUserStageModel = require('../models/THUserStage');
var THResourceModel = require('../models/THResources');

var service = {};

service.getUserStage = function(req, res, cb) {
    const userId = req.body.user;
    const event = req.body.event;
    console.log('check value', userId, event);
    if (userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }
    /**get user current stage*/
    const query = THUserStageModel.findOne({'user': userId});
    query.exec(function (err, data) {
        if (err) {
            /**user is not present*/
            cb({'error': 'cannot get the state', data: err});
            return;
        }
        if (data === null) {
            /**new to event*/
            cb(null);
            return;
        }
        cb(data);
    });
};

service.getUserStageQuestion = function (req, res, cb) {
    service.getUserStage(req, res, function (currentStage) {
        if(currentStage) {
            const query = THResourceModel.findOne({'stage': currentStage.stage});
            query.exec(function (err, data) {
                cb(data);
            });
        } else {
            console.log('no stage entry in the userstage');
            cb(null);
        }
    });
};

service.neatlyUpdateUserStage = function (userId, event, res, updateObj, cb, resJson) {
    THUserStageModel.update({
        'user': userId,
    }, updateObj, function (err) {
        console.log('err', err);
        if (err) {
            res['error'] = 'cannot update the user state';
            res['data'] = err;
        }
        cb(resJson);
    });
};

service.updateUserStage = function (req, res, currentstage, cb) {
    //update user state
    const userId = req.body.user;
    const event = req.body.event;
    if (userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }

    /**update user current stage*/
    const stagesQuery = EventModel.findOne({'slug': 'treasurehunt'}).select({'stages': 1});
    stagesQuery.exec(function (err, rDoc) {
        var resJson = {};
        const numberOfStages = rDoc.stages  || 0;
        const updateQueryObj = {};
        if(numberOfStages === currentstage.stage) {
            /**update state to completed */
            updateQueryObj['$set'] = {'completed': true};
            resJson = {'completed':true};
        } else {
            updateQueryObj['$inc'] = {'stage': 1};
            resJson = {'completed':false};
        }
        service.neatlyUpdateUserStage(userId, event, res, updateQueryObj, cb, resJson);
    });
};

/*
service.checkAnswersSubmitted = function (submitted, correct) {
    if(submitted.length !== correct.length) {
        return false;
    }
    for(let i=0; i<submitted.length; i++) {
        const _i = correct.findIndex(x => x === submitted[i]);
        if(_i < 0) {
            /!** wrong answer *!/
            return false;
        }
    }
    return true;
}
*/

module.exports = service;