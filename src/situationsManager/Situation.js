/**
 * Probably just 'Situation' with json passed
 * @param {Object} game               Phaser.Game
 * @param {Object} roadObjectsFactory road objects factory object
 */
function Situation(game, roadObjectsFactory, manager, concreteSituation, presenterSprite, fx) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;
    this.manager = manager;
    this.concreteSituation = concreteSituation;
    this.presenterSprite = presenterSprite;
    this.concreteSituation.roadObjectsFactory = this.roadObjectsFactory;
    // true/false if situation is played/not played
    this.situationInProgress = false;

    this.checkedCollisions = {};

    this.initSituationObjects();

    this.notificationsFactory = new NotificationsFactory(this.game, this.concreteSituation.instructionTexts, this.presenterSprite, fx);

    this.situationStagesManager = new SituationStagesManager(this.game, this);
    this.initStages();
    // initialize introducing notification
    this.initIntroduction();
};

Situation.prototype.initSituationObjects = function () {
    for (var i = 0; i < this.concreteSituation.situationPlan.length; i++) {
        var name = this.concreteSituation.situationPlan[i].name;
        var type = this.concreteSituation.situationPlan[i].type;
        var spriteName = this.concreteSituation.situationPlan[i].sprite;
        var posX = this.concreteSituation.situationPlan[i].posX;
        var posY = this.concreteSituation.situationPlan[i].posY;
        var angle = this.concreteSituation.situationPlan[i].angle;

        var initializedRoadObject;
        if (!this.roadObjectsFactory.objectExists(name)) {
            initializedRoadObject = this.roadObjectsFactory.create(name, spriteName);
        } else {
            initializedRoadObject = this.roadObjectsFactory.get(name);
        }

        initializedRoadObject.setPos(posX, posY);
        initializedRoadObject.sprite.angle = angle;

        if (angle === -90 || angle == 90) {
            // probably better (proper) solution will be needed
            // change body's width with height
            initializedRoadObject.sprite.body.setSize(initializedRoadObject.sprite.height, initializedRoadObject.sprite.width);
        }

        if (type === "roadTrigger") {
            // uncomment to make triggers invisible
            initializedRoadObject.sprite.alpha = 0;
        }
    }
};

Situation.prototype.getSector = function () {
    return this.concreteSituation.sector;
};

Situation.prototype.initIntroduction = function () {

    this.notificationsFactory.addNotification(
        this.concreteSituation.instructionTexts.bad.name,
        this.concreteSituation.instructionTexts.bad.text,
        250, 200,
        this.startSituation, this);

    this.notificationsFactory.addNotification(
        this.concreteSituation.instructionTexts.good.name,
        this.concreteSituation.instructionTexts.good.text,
        250, 200,
        SituationStage.prototype.setFinished, this.situationStagesManager.getStage(3));

};

Situation.prototype.isInProgress = function () {
    return this.situationInProgress;
};

Situation.prototype.initStages = function () {
    this.initStage(0, true);
    this.initStage(1, true);
    this.initStage(2, true);
    this.initStage(3, true);
    ///////////////////////////
    this.initStage(4, false);
    this.initStage(5, false);
    this.initStage(6, false);
    this.initStage(7, false);
};

/**
 * initialize stage with a given number
 * @param {Number}  stageNumber stage's number
 * @param {Boolean} badStage    true/false if stage is presenting bad/good situation
 */
Situation.prototype.initStage = function (stageNumber, badStage) {
    var stage = new SituationStage(this.situationStagesManager, this.game, this.roadObjectsFactory);
    if (stageNumber === 0) {
        stage.rememberStartingPositionsOnce();
    }
    this.concreteSituation.initStage(stageNumber, stage);
    this.situationStagesManager.pushNewStage(stage, badStage);
};

Situation.prototype.startSituation = function () {
    this.situationInProgress = true;
    this.setObjectsTextPositions();
    this.startStage(0);
};

Situation.prototype.setObjectsTextPositions = function () {
    // remove all texts from the screen
    for (key in this.roadObjectsFactory.roadObjects) {
        var object = this.roadObjectsFactory.get(key);
        object.setTextPos(-999, 999);
    }
    // set texts only for objects from this situation
    for (var i = 0; i < this.concreteSituation.situationPlan.length; i++) {
        var name = this.concreteSituation.situationPlan[i].name;
        var initializedRoadObject = this.roadObjectsFactory.get(name);
        initializedRoadObject.setTextPos(10, i * 20);
    }
};

Situation.prototype.startStage = function (stageNumber) {
    this.resetCollisionCheck();
    var stage = this.situationStagesManager.getStage(stageNumber);
    this.situationStagesManager.getStage(stageNumber).start();
};

Situation.prototype.update = function (game) {
    this.situationStagesManager.getCurrentStage().afterMovementChange();
    this.handleCollisions(game);
};

/**
 * Invoked when situation is finished
 * (probably SituationStagesManager decides that).
 */
Situation.prototype.onSituationFinished = function () {
    this.situationInProgress = false;
    this.manager.onCurrentSituationFinished();
};

/**
 * Finish this situation.
 */
Situation.prototype.setFinished = function () {
    this.notificationsFactory.setNotification(this.concreteSituation.instructionTexts.bad.name, false);
    this.situationStagesManager.getStageLast().setFinished();
};

Situation.prototype.handleCollisions = function (game) {
    for (var i = 0; i < this.concreteSituation.collisions.length; i++) {
        var pair = this.concreteSituation.collisions[i];
        var sprite1 = this.roadObjectsFactory.get(pair[0]).sprite;
        var sprite2 = this.roadObjectsFactory.get(pair[1]).sprite;
        if (!this.isCollisionChecked(sprite1, sprite2)) {
            game.physics.arcade.overlap(sprite1, sprite2, this.collisionHandler, null, this);
        }
    }
};

Situation.prototype.collisionHandler = function (sprite1, sprite2) {
    this.addCheckedCollision(sprite1, sprite2);
    this.situationStagesManager.getCurrentStage().handleCollision(sprite1, sprite2);
};

Situation.prototype.addCheckedCollision = function (sprite1, sprite2) {
    if (this.checkedCollisions[sprite1.name] === undefined) {
        this.checkedCollisions[sprite1.name] = new Object();
    }
    this.checkedCollisions[sprite1.name][sprite2.name] = true;
}

Situation.prototype.isCollisionChecked = function (sprite1, sprite2) {
    if (this.checkedCollisions[sprite1.name] === undefined) return false;
    if (this.checkedCollisions[sprite1.name][sprite2.name] === undefined) return false;

    return this.checkedCollisions[sprite1.name][sprite2.name];
};

Situation.prototype.resetCollisionCheck = function () {
    for (var keyA in this.checkedCollisions) {
        for (var keyB in this.checkedCollisions[keyA]) {
            this.checkedCollisions[keyA][keyB] = false;
        }
    }
};