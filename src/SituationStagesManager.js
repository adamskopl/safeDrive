function SituationStagesManager() {
    this.stages = [];
}

SituationStagesManager.prototype.pushNewStage = function (newStage) {
    this.stages.push(newStage);
};

/**
 * Descdescdesc
 * @param   {Number} stageNumber stage's number
 * @returns {Object} SafeDrive.SituationStage
 */
SituationStagesManager.prototype.getStage = function (stageNumber) {
    return this.stages[stageNumber];
};

/**
 * SituationStage
 * @param {Object} game               Phaser.Game
 * @param {Object} roadObjectsFactory RoadObjectsFactory object
 */
function SituationStage(game, roadObjectsFactory) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;
    // dictionary(key: id of road object; value: pair of coordinates)
    this.startingPositions = {};
    // dictionary(key: id of road object; value: pair starting velocities)
    this.startingVelocities = {};
    // dictionary(key: id of first sprites' name; value: dictionary(key:id of the second sprite's name;
    // value: function handling collision))
    this.collisionHandlers = {};
    this.notifications = {};

    // initialize starting positions with given roadObjects array
    for (var ro in this.roadObjectsFactory.roadObjects) {
        this.startingPositions[ro] = {
            x: roadObjectsFactory.roadObjects[ro].sprite.x,
            y: roadObjectsFactory.roadObjects[ro].sprite.y
        };
    }
}

/**
 * Add starting velocity to starting velocities dictionary. When stage starts, objects will have velocities applied.
 * @param {String} roName road object's id
 * @param {Number} velX   object's starting x velocity
 * @param {Number} velY   object's starting y velocity
 */
SituationStage.prototype.addVelocity = function (roName, velX, velY) {
    this.startingVelocities[roName] = {
        x: velX,
        y: velY
    };
};

/**
 * Add collision handler for given two sprites.
 * @param {String}   sprite1Name      first sprite's name
 * @param {String}   sprite2Name      secont sprite's name
 * @param {Function} collisionHandler function called when sprites are colliding
 */
SituationStage.prototype.addCollisionHandler = function (sprite1Name, sprite2Name, collisionHandler) {
    if (this.collisionHandlers[sprite1Name] === undefined) {
        this.collisionHandlers[sprite1Name] = {};
    }
    this.collisionHandlers[sprite1Name][sprite2Name] = collisionHandler;
};

/**
 * Start stage: apply positions, velocities.
 */
SituationStage.prototype.start = function () {
    for (var objectKey in this.startingVelocities) {
        var velX = this.startingVelocities[objectKey].x;
        var velY = this.startingVelocities[objectKey].y;
        this.roadObjectsFactory.get(objectKey).sprite.body.velocity.x = velX;
        this.roadObjectsFactory.get(objectKey).sprite.body.velocity.y = velY;
    }
};

/**
 * Get RoadObject object from the factory.
 * @param {String} roKey RoadObject object's name
 */
SituationStage.prototype.getObject = function (roKey) {
    return this.roadObjectsFactory.roadObjects[roKey];
};

/**
 * Add notification to this stage.
 * @param {String} id notification's id
 * @param {String} text notification's text
 * @param {Number} posX notification's pos x
 * @param {Number} posY notification's pos y
 */
SituationStage.prototype.addNotification = function (id, text, posX, posY) {
    this.notifications[id] = new Notification(this.game, id, text, posX, posY);
}

SituationStage.prototype.getNotification = function (id) {
    return this.notifications[id];
};

SituationStage.prototype.isFinished = function () {

};

SituationStage.prototype.handleCollision = function (sprite1, sprite2) {
    if (this.collisionHandlers[sprite1.name] === undefined) {
        return;
    }
    if (this.collisionHandlers[sprite1.name][sprite2.name] === undefined) {
        return;
    }
    this.collisionHandlers[sprite1.name][sprite2.name].call(this);
}