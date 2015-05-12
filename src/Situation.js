/**
 * Probably just 'Situation' with json passed
 * @param {Object} game               Phaser.Game
 * @param {Object} roadObjectsFactory road objects factory object
 */
function Situation(game, roadObjectsFactory, concreteSituation, presenterSprite) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;
    this.concreteSituation = concreteSituation;
    this.presenterSprite = presenterSprite;
    this.concreteSituation.roadObjectsFactory = this.roadObjectsFactory;

    this.checkedCollisions = new Object();

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
        initializedRoadObject.setTextPos(400, i * 20 + 100);

        if (type === "roadTrigger") {
            // uncomment to make triggers invisible
            //            newRoadObject.sprite.visible = false;
        }
    }

    this.notificationsFactory = new NotificationsFactory(this.game, this.concreteSituation.instructionTexts, this.presenterSprite);

    this.situationStagesManager = new SituationStagesManager(this.game, this);
    // initialize introducing notification
    this.initIntroduction();
    this.initStages();
};

Situation.prototype.initIntroduction = function () {
    this.notificationsFactory.addNotification(
        this.concreteSituation.instructionTexts.bad.name, this.concreteSituation.instructionTexts.bad.text, 250, 300);
    this.notificationsFactory.getNotification(this.concreteSituation.instructionTexts.bad.name).addConfirmButton(
        this.startSituation, this);
};

Situation.prototype.initStages = function () {
    this.initStage(0);
    this.initStage(1);
    this.initStage(2);
    this.initStage(3);
    this.initStage(4);
};

Situation.prototype.initStage = function (stageNumber) {
    var stage = new SituationStage(this.situationStagesManager, this.game, this.roadObjectsFactory);
    if (stageNumber === 0) {
        stage.rememberStartingPositionsOnce();
    }
    this.concreteSituation.initStage(stageNumber, stage);
    this.situationStagesManager.pushNewStage(stage);
};

Situation.prototype.startSituation = function () {
    this.notificationsFactory.presenterSprite.visible = true;
    this.startStage(0);
};

Situation.prototype.startStage = function (stageNumber) {
    this.resetCollisionCheck();
    this.situationStagesManager.getStage(stageNumber).start();
};

Situation.prototype.update = function (game) {
    this.situationStagesManager.getCurrentStage().afterMovementChange();
    this.handleCollisions(game);
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