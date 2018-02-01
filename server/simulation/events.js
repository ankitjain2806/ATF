const EventModel = require('../models/Event');

function createEvents() {
    console.log('attempting to simulate events...');
    const event1 = new EventModel({
        name: 'Treasure Hunt',
        description: 'Hunt for treasure',
        "stages" : [
            {
                "question" : "What is the first blockchain application?",
                "type" : "NORMAL",
                "answer" : "bitcoin"
            },
            {
                "question" : "Choose those which give 'true'",
                "type" : "MCQ",
                "options" : [
                    "2==2",
                    "2!=2",
                    "a!=b",
                    "b=a"
                ],
                "answer" : [
                    "0"
                ]
            }
        ]
    });

    const event2 = new EventModel({
        name: 'Compiler',
        description: 'Compile it yourself'
    });

    const allEvents = [event1, event2];
    const logs = [];
    allEvents.forEach(function (event, index) {
        event.save(function (err) {
            if (err) {
                console.log(event.name + ' failed to save in db');
            }
            console.log(event.name + ' success to save in db');
        })
        ;
    });
    console.log('finished to simulate events... ');
}

const simulate = function () {
    createEvents();
};

module.exports = simulate;