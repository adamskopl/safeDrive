/**
 * Probably just 'Situation' with json passed
 * @param {Object} game               Phaser.Game
 * @param {Object} roadObjectsFactory road objects factory object
 */
function Situation01(game, roadObjectsFactory) {

    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;
    this.checkedCollisions = new Object();

    for (var i = 0; i < situationPlan.length; i++) {
        var type = situationPlan[i].type;
        if (type === "roadObject") {
            var name = situationPlan[i].name;
            var spriteName = situationPlan[i].sprite;
            var posX = situationPlan[i].posX;
            var posY = situationPlan[i].posY;
            var angle = situationPlan[i].angle;
            var newRoadObject = this.roadObjectsFactory.create(name, spriteName);

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
    this.initStages();
};

Situation01.prototype.handleCollisions = function (game) {
    for (var i = 0; i < collisions.length; i++) {
        var pair = collisions[i];
        var sprite1 = this.roadObjectsFactory.get(pair[0]).sprite;
        var sprite2 = this.roadObjectsFactory.get(pair[1]).sprite;
        if (!this.isCollisionChecked(sprite1, sprite2)) {
            game.physics.arcade.overlap(sprite1, sprite2, this.collisionHandler, null, this);
        }
    }
};

Situation01.prototype.collisionHandler = function (sprite1, sprite2) {
    this.addCheckedCollision(sprite1, sprite2);
    this.situationStagesManager.getStage(0).handleCollision(sprite1, sprite2);
};

Situation01.prototype.addCheckedCollision = function (sprite1, sprite2) {
    if (this.checkedCollisions[sprite1.name] === undefined) {
        this.checkedCollisions[sprite1.name] = new Object();
    }
    this.checkedCollisions[sprite1.name][sprite2.name] = true;
}

Situation01.prototype.isCollisionChecked = function (sprite1, sprite2) {
    if (this.checkedCollisions[sprite1.name] === undefined) return false;
    if (this.checkedCollisions[sprite1.name][sprite2.name] === undefined) return false;
    return true;
};

var collisions = [
    ["pedestrianA", "carA"],
    ["pedestrianA", "carB"],
    ["triggerA", "carA"],
    ["triggerA", "carB"]
];

var situationPlan = [
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": "carA",
        "posX": 220,
        "posY": 570,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": "carB",
        "posX": 188,
        "posY": 620,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "pedestrian",
        "name": "pedestrianA",
        "posX": 300,
        "posY": 414,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "trigger",
        "name": "triggerA",
        "posX": 200,
        "posY": 466,
        "angle": 0
    }
];