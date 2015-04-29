/*
    Probably just 'Situation' with json passed
*/
SafeDrive.Situation01 = function (roadObjectsFactory) {

    this.roadObjectsFactory = roadObjectsFactory;
    this.checkedCollisions = new Object();

    for (var i = 0; i < situationPlan.length; i++) {
        var type = situationPlan[i].type;
        if (type === "roadObject") {
            var spriteName = situationPlan[i].sprite;
            var posX = situationPlan[i].posX;
            var posY = situationPlan[i].posY;
            var angle = situationPlan[i].angle;
            var newRoadObject = this.roadObjectsFactory.create(spriteName, i);

            newRoadObject.setPos(posX, posY);
            newRoadObject.sprite.angle = angle;

            if (angle === -90) {
                // probably better (proper) solution will be needed
                // change body's width with height
                newRoadObject.sprite.body.setSize(newRoadObject.sprite.height, newRoadObject.sprite.width);
            }

            newRoadObject.text.text = name;
            newRoadObject.setTextPos(400, i * 20 + 100);
        } else if (type === "roadTrigger") {

        } else {
            console.log("loading: unknown type " + type);
        }
    }

    // START MOVEMENT
    this.roadObjectsFactory.get("car010").sprite.body.velocity.y = -80;
};

SafeDrive.Situation01.prototype.handleCollisions = function (game) {
    for (var i = 0; i < collisions.length; i++) {
        var pair = collisions[i];
        var sprite1 = this.roadObjectsFactory.get(pair[0]).sprite;
        var sprite2 = this.roadObjectsFactory.get(pair[1]).sprite;
        if (!this.isCollisionChecked(sprite1, sprite2)) {
            game.physics.arcade.overlap(sprite1, sprite2, this.collisionHandler, null, this);
        }
    }
};

SafeDrive.Situation01.prototype.collisionHandler = function (sprite1, sprite2) {
    this.addCheckedCollision(sprite1, sprite2);

    if (sprite1.name === "trigger3") {
        if (sprite2.name === "car010") {
            this.roadObjectsFactory.get("car021").sprite.body.velocity.y = -100;
        }
        if (sprite2.name === "car021") {
            this.roadObjectsFactory.get("pedestrian2").sprite.body.velocity.x = -150;
        }
    }
};

SafeDrive.Situation01.prototype.addCheckedCollision = function (sprite1, sprite2) {
    if (this.checkedCollisions[sprite1.name] === undefined) {
        this.checkedCollisions[sprite1.name] = new Object();
    }
    this.checkedCollisions[sprite1.name][sprite2.name] = true;
}

SafeDrive.Situation01.prototype.isCollisionChecked = function (sprite1, sprite2) {
    if (this.checkedCollisions[sprite1.name] === undefined) return false;
    if (this.checkedCollisions[sprite1.name][sprite2.name] === undefined) return false;
    return true;
};

var collisions = [
    ["pedestrian2", "car010"],
    ["pedestrian2", "car021"],
    ["trigger3", "car021"],
    ["trigger3", "car010"]
]

var situationPlan = [
    {
        "type": "roadObject",
        "sprite": "car01",
        "posX": 220,
        "posY": 570,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "posX": 188,
        "posY": 570,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "pedestrian",
        "posX": 300,
        "posY": 414,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "trigger",
        "posX": 200,
        "posY": 466,
        "angle": 0
    }
];