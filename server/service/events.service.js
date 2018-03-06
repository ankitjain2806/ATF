var EventModel = require('../models/Event');
var UserEventStateModel = require('../models/UserEventState');
var THResourceModel = require('../models/THResources');

var service = {};

service.getUserStateForEvent = function(req, res, cb) {
    const userId = req.body.user;
    const event = req.body.event;
    console.log('check value', userId, event);
    if (userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }
    /**get user current stage*/
    const query = UserEventStateModel.findOne({'user': userId});
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
        const _events = data.events;
        const _state = _events.filter(function (item) {
            return item.slug.toString() === event;
        });
        cb(_state);
    });
};

service.getUserStageQuestion = function (req, res, cb) {
    service.getUserStateForEvent(req, res, function (currentState) {
        // get current stage [index] from stages
        //TODo check for the current stage of particular user_id 
        if(currentState && currentState[0].stage) {
            const query = THResourceModel.findOne({'stage': currentState[0].stage});
            query.exec(function (err, data) {
                cb(data);
            });
        } else {
            console.log('no stage entry in the userstage');
            cb(null);
        }
    });
};

service.neatlyUpdateUserState = function (userId, event, res, updateObj, cb) {
    UserEventStateModel.update({
        'user': userId,
        'events.slug': event
    }, updateObj, function (err) {
        console.log('err', err);
        if (err) {
            res['error'] = 'cannot update the user state';
            res['data'] = err;
            cb();
        }
    });
};

service.updateUserEventState = function (req, res, state, cb) {
    console.log('-------------updating........');
    //update user state
    const userId = req.body.user;
    const event = req.body.event;
    if (userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }

    /**update user current stage*/
    const stagesQuery = EventModel.find({'slug': event}).select({'stages': 1});
    stagesQuery.exec(function (err, rDoc) {
        const numberOfStages = rDoc[0].stages.length || 0;
        const updateQueryObj = {};
        if(numberOfStages === state[0].stage) {
            /**update state to completed */
            updateQueryObj['$set'] = {'events.$.completed': true};
        } else {
            updateQueryObj['$inc'] = {'events.$.stage': 1};
        }
        service.neatlyUpdateUserState(userId, event, res, updateQueryObj, cb);
    });
};

service.checkAnswersSubmitted = function (submitted, correct) {
    if(submitted.length !== correct.length) {
        return false;
    }
    for(let i=0; i<submitted.length; i++) {
        const _i = correct.findIndex(x => x === submitted[i]);
        if(_i < 0) {
            /** wrong answer */
            return false;
        }
    }
    return true;
}

module.exports = service;