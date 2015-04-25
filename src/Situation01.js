/*
    Probably just 'Situation' with json passed
*/
SafeDrive.Situation01 = function (roadObjectsFactory) {

    this.roadObjectsFactory = roadObjectsFactory;

    for (var i = 0; i < situationPlan.length; i++) {
        var type = situationPlan[i].type;
        if (type === "roadObject") {
            var name = situationPlan[i].name;
            var posX = situationPlan[i].posX;
            var posY = situationPlan[i].posY;
            var angle = situationPlan[i].angle;
            var newRoadObject = this.roadObjectsFactory.create(name);

            newRoadObject.setPos(posX, posY);
            newRoadObject.sprite.angle = angle;
            newRoadObject.text.text = name;
            newRoadObject.setTextPos(400, i * 20 + 100);
        } else if (type === "roadTrigger") {

        } else {
            console.log("loading: unknown type " + type);
        }
    }

};

var situationPlan = [
    {
        "type": "roadObject",
        "name": "car01",
        "posX": 220,
        "posY": 581,
        "angle": -90
    },
    {
        "type": "roadObject",
        "name": "car02",
        "posX": 188,
        "posY": 581,
        "angle": -90
    },
    {
        "type": "roadObject",
        "name": "pedestrian",
        "posX": 312,
        "posY": 414,
        "angle": 0
    }
];