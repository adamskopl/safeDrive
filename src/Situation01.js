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

        if (type === "roadTrigger") {
            newRoadObject.sprite.visible = false;
        }
    }
    this.notificationsFactory = new NotificationsFactory(this.game);
    this.situationStagesManager = new SituationStagesManager(this.game, this);
    // initialize introducing notification
    this.initIntroduction();
    this.initStages();
};

Situation01.prototype.initIntroduction = function () {
    this.notificationsFactory.addNotification(
        s01IntroductionText.name, s01IntroductionText.text, null, 250, 300);
    this.notificationsFactory.getNotification(s01IntroductionText.name).addConfirmButton(
        this.startSituation, this);
};

Situation01.prototype.testFun = function () {
    console.log("FUUUUN");
};

Situation01.prototype.initStages = function () {
    this.initStage(0);
    this.initStage(1);
    this.initStage(2);
    this.initStage(3);
    this.initStage(4);

    this.notificationsFactory.startNotification(s01IntroductionText.name, 0);
};

Situation01.prototype.startSituation = function () {
    this.startStage(0);
};

Situation01.prototype.startStage = function (stageNumber) {
    this.resetCollisionCheck();
    this.situationStagesManager.getStage(stageNumber).start();
};

Situation01.prototype.update = function (game) {
    this.situationStagesManager.getCurrentStage().afterMovementChange();
    this.handleCollisions(game);
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
    this.situationStagesManager.getCurrentStage().handleCollision(sprite1, sprite2);
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

    return this.checkedCollisions[sprite1.name][sprite2.name];
};

Situation01.prototype.resetCollisionCheck = function () {
    for (var keyA in this.checkedCollisions) {
        for (var keyB in this.checkedCollisions[keyA]) {
            this.checkedCollisions[keyA][keyB] = false;
        }
    }
};

var collisions = [
    ["pedestrianA", "carA"],
    ["pedestrianA", "carB"],
    ["triggerA", "carA"],
    ["triggerA", "carB"],
    ["triggerB", "carA"],
    ["carB", "pedestrianA"],
    ["triggerC", "carB"],
    ["tCarBIntroInfo", "carB"]
];

var situationPlan = [
    {
        "type": "roadObject",
        "sprite": "jimmy",
        "name": "pedestrianA",
        "posX": 370,
        "posY": 395,
        "angle": 0
    },
    {
        "type": "roadObject",
        "sprite": "car01",
        "name": "carA",
        "posX": 220,
        "posY": 1000,
        "angle": -90
    },
    {
        "type": "roadObject",
        "sprite": "car02",
        "name": "carB",
        "posX": 188,
        "posY": 630,
        "angle": -90
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerA",
        "posX": 200,
        "posY": 540,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerB",
        "posX": 230,
        "posY": 450,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "triggerC",
        "posX": 195,
        "posY": 450,
        "angle": 0
    },
    {
        "type": "roadTrigger",
        "sprite": "trigger",
        "name": "tCarBIntroInfo",
        "posX": 188,
        "posY": 540,
        "angle": 0
    }
];

var s01IntroductionText = {
    name: "introductionText",
    text: [
"Lorem ipsum dolor sit amet, consectetur",
"adipiscing elit. Donec ultricies semper metus",
"vel porta quam blandit quis. Quisque",
"mi dolor, blandit blandit ex a",
"commodo ultricies sem. Cras suscipit lacus",
"id mollis hendrerit. Etiam sit amet",
"vehicula mauris, id ullamcorper lacus. Pellentesque",
"elementum feugiat tincidunt. Morbi vel tincidunt",
"lacus, sed scelerisque enim. Quisque eu",
"nulla eu mi iaculis gravida. Sed",
"eu imperdiet lectus. Quisque eu tempor",
"felis. Nunc vitae diam rutrum, viverra",
"diam in, commodo orci. Maecenas eget"]
};