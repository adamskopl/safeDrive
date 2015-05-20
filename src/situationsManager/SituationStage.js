/**
 * SituationStage
 * @param {Object} manager             SituationStageManager
 * @param {Object} game               Phaser.Game
 * @param {Object} roadObjectsFactory RoadObjectsFactory object
 */
function SituationStage(manager, game, roadObjectsFactory) {
    // stage's number set by manager
    this.number = {};
    this.manager = manager;
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;

    // dictionary(key: id of road object; value: pair of coordinates)
    this.startingPositions = {};
    // if != -1, set startintPositions from another stage, which number is given by this variable
    this.stageNumberFromWhichPositionsAreTaken = -1;
    this.startingPositionsInitialized = false;
    // dictionary(key: id of road object; value: pair starting velocities)
    this.startingVelocities = {};
    // dictionary(key: od of rad object; value: sprite's animation to play)
    this.startingAnimations = {};
    // dictionary(key: id of already added notification to play; 
    // value: object{delay, duration})
    this.startingNotificationsToPlay = {};

    // dictionary(key: id of first sprites' name; value: dictionary(key:id of the second sprite's name;
    // value: function handling collision))
    this.collisionHandlers = {};
    this.notificationsFactory = manager.notificationsFactory;
    this.spritesBodyMovementUnlockNeeded = false;
}

/**
 * Add starting position to starting positions dictionary. When the stage starts, objects will have
 * positions applied. If object's position is not set through this function, starting positions will be
 * taken from RoadObjectsFactory at the stage's start.
 */
SituationStage.prototype.addStartingPosition = function (roName, posX, posY, angle) {
    this.startingPositions[roName] = {
        x: posX,
        y: posY,
        angle: angle
    };
}

SituationStage.prototype.addStartingPositionsFromStage = function (stageNumber) {
    var otherStage = this.manager.getStage(stageNumber);
    for (var posEntry in otherStage.startingPositions) {
        this.startingPositions[posEntry] = {
            x: otherStage.startingPositions[posEntry].x,
            y: otherStage.startingPositions[posEntry].y,
            angle: angle
        };
    }
}

/**
 * Add starting velocity to starting velocities dictionary. When stage starts, objects will have velocities applied.
 * @param {String} roName road object's id, or array of objects ids
 * @param {Number} velX   object's starting x velocity
 * @param {Number} velY   object's starting y velocity
 */
SituationStage.prototype.addStartingVelocity = function (roName, velX, velY, accelX, accelY) {
    var objNum = 1;
    var objArray;
    // if array of names passed...
    if (typeof (roName) === "object") {
        objNum = roName.length;
        objArray = roName;
    }

    for (i = 0; i < objNum; i++) {
        if (objNum > 1) {
            roName = objArray[i];
        }

        var newAccelX = accelX;
        var newAccelY = accelY;
        if (accelX === undefined) newAccelX = 0;
        if (accelY === undefined) newAccelY = 0;
        this.startingVelocities[roName] = {
            x: velX,
            y: velY,
            accelX: newAccelX,
            accelY: newAccelY
        };
    }
};

SituationStage.prototype.addStartingVelocityTurn = function (roName) {

};

SituationStage.prototype.addStartingAnimation = function (roName, animationName) {
    this.startingAnimations[roName] = animationName;
};

/**
 * Add notification start at the start of the stage.
 * Notification has to be added first.
 * @param {String} notificationId notification's id
 * @param {Number} delay          notification's play delay
 * @param {Number} duration       notification's play duration
 */
SituationStage.prototype.addStartingNotificationPlay = function (notificationId, delay, duration) {
    this.startingNotificationsToPlay[notificationId] = {
        delay: delay,
        duration: duration
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
    this.rememberStartingPositionsOnce();
    // set sprites starting positions, turn body movement off
    for (var objectKey in this.startingPositions) {
        var object = this.roadObjectsFactory.roadObjects[objectKey];
        // turn off moving to manually change sprite's position
        object.sprite.body.moves = false;
        var posX = this.startingPositions[objectKey].x;
        var posY = this.startingPositions[objectKey].y;
        var angle = this.startingPositions[objectKey].angle;
        object.sprite.x = posX;
        object.sprite.y = posY;
        object.sprite.angle = angle;

        if (angle === -90 || angle == 90) {
            // probably better (proper) solution will be needed
            // change body's width with height
            object.sprite.body.setSize(object.sprite.height, object.sprite.width);
        }

        if (this.startingAnimations[objectKey] !== undefined) {
            object.sprite.animations.play(this.startingAnimations[objectKey]);
        }
    };
    // sprite's body's movement will be turned on in next main loop's update()
    this.spritesBodyMovementUnlockNeeded = true;

    for (var key in this.startingNotificationsToPlay) {
        var notifObject = this.startingNotificationsToPlay[key];
        this.notificationsFactory.startNotification(
            key, notifObject.delay, notifObject.duration);
    };
};

/**
 * Invoked only once for every stage: remember objects positions to set them every time this stage starts.
 */
SituationStage.prototype.rememberStartingPositionsOnce = function () {
    if (this.startingPositionsInitialized) return;
    this.startingPositionsInitialized = true;

    if (this.stageNumberFromWhichPositionsAreTaken !== -1) {
        var otherStage = this.manager.getStage(this.stageNumberFromWhichPositionsAreTaken);
        for (var posEntry in otherStage.startingPositions) {
            this.startingPositions[posEntry] = {
                x: otherStage.startingPositions[posEntry].x,
                y: otherStage.startingPositions[posEntry].y,
                angle: otherStage.startingPositions[posEntry].angle
            };
        }
        return;
    }

    // initialize starting positions with given roadObjects array
    for (var ro in this.roadObjectsFactory.roadObjects) {
        if (this.startingPositions[ro] === undefined) {
            this.startingPositions[ro] = {
                x: this.roadObjectsFactory.roadObjects[ro].sprite.x,
                y: this.roadObjectsFactory.roadObjects[ro].sprite.y,
                angle: this.roadObjectsFactory.roadObjects[ro].sprite.angle
            };
        }
    }
};

/**
 * Special function invoked in 'update' function in game's loop. It's a complement of SituationStage.start
 * function, because reactivating sprite's physics properties has to be done after physics system update.
 */
SituationStage.prototype.afterMovementChange = function () {
    if (!this.spritesBodyMovementUnlockNeeded) return;
    this.spritesBodyMovementUnlockNeeded = false;

    for (var objectKey in this.roadObjectsFactory.roadObjects) {
        var object = this.roadObjectsFactory.roadObjects[objectKey];
        object.sprite.body.reset(object.sprite.x, object.sprite.y);
        if (this.startingVelocities[objectKey] !== undefined) {
            var velocity = this.startingVelocities[objectKey];
            var body = object.sprite.body;
            body.velocity.x = velocity.x;
            body.velocity.y = velocity.y;
            body.acceleration.x = velocity.accelX;
            body.acceleration.y = velocity.accelY;
        }
        object.sprite.body.moves = true;
    }
};

/**
 * Get RoadObject object from the factory.
 * @param {String} roKey RoadObject object's name
 */
SituationStage.prototype.getObject = function (roKey) {
    return this.roadObjectsFactory.roadObjects[roKey];
};


SituationStage.prototype.notification = function () {
    return this.notificationsFactory;
};

/**
 * Invoked when sthage is finished.
 */
SituationStage.prototype.setFinished = function () {
    this.notification().attentionHide();
    this.manager.onStageFinished(this.number);
};

SituationStage.prototype.handleCollision = function (sprite1, sprite2) {
    if (this.collisionHandlers[sprite1.name] === undefined) {
        return;
    }
    if (this.collisionHandlers[sprite1.name][sprite2.name] === undefined) {
        return;
    }
    this.collisionHandlers[sprite1.name][sprite2.name].call(this);
};

/**
 * Button pointing this stage is clicked.
 */
SituationStage.prototype.onStageButtonClick = function () {
    this.manager.currentStageNumber = this.number;
    this.manager.situation.startStage(this.number)
};