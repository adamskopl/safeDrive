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
    // initialize introducing notification
    this.initIntroduction();
    this.initStages();
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

        if (angle === -90) {
            // probably better (proper) solution will be needed
            // change body's width with height
            initializedRoadObject.sprite.body.setSize(initializedRoadObject.sprite.height, initializedRoadObject.sprite.width);
        }

        initializedRoadObject.text.text = name;
        initializedRoadObject.setTextPos(400, i * 20);

        if (type === "roadTrigger") {
            // uncomment to make triggers invisible
            //            newRoadObject.sprite.visible = false;
        }
    }
};

Situation.prototype.getSector = function () {
    return this.concreteSituation.sector;
};

Situation.prototype.initIntroduction = function () {
    this.notificationsFactory.addNotification(
        this.concreteSituation.instructionTexts.bad.name, this.concreteSituation.instructionTexts.bad.text, 250, 300);
    this.notificationsFactory.getNotification(this.concreteSituation.instructionTexts.bad.name).addConfirmButton(
        this.startSituation, this);
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
    this.notificationsFactory.presenterSprite.visible = true;
    this.startStage(0);
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