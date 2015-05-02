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
    this.startingPositionsInitialized = false;
    // dictionary(key: id of road object; value: pair starting velocities)
    this.startingVelocities = {};
    // dictionary(key: id of first sprites' name; value: dictionary(key:id of the second sprite's name;
    // value: function handling collision))
    this.collisionHandlers = {};
    this.notifications = {};
}

SituationStage.prototype.initStartingPositions = function () {
    if (this.startingPositionsInitialized) return;
    this.startingPositionsInitialized = true;
    // initialize starting positions with given roadObjects array
    for (var ro in this.roadObjectsFactory.roadObjects) {
        this.startingPositions[ro] = {
            x: this.roadObjectsFactory.roadObjects[ro].sprite.x,
            y: this.roadObjectsFactory.roadObjects[ro].sprite.y
        };
    }
}

/**
 * Add starting velocity to starting velocities dictionary. When stage starts, objects will have velocities applied.
 * @param {String} roName road object's id
 * @param {Number} velX   object's starting x velocity
 * @param {Number} velY   object's starting y velocity
 */
SituationStage.prototype.addStartingVelocity = function (roName, velX, velY) {
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
    this.initStartingPositions();
    // set sprites starting positions, turn body movement off
    for (var objectKey in this.roadObjectsFactory.roadObjects) {
        var object = this.roadObjectsFactory.roadObjects[objectKey];
        // turn off moving to manually change sprite's position
        object.sprite.body.moves = false;
        var posX = this.startingPositions[objectKey].x;
        var posY = this.startingPositions[objectKey].y;
        object.sprite.x = posX;
        object.sprite.y = posY;
    }
    // sprite's body's movement will be turned on in next main loop's update()
    this.spritesBodyMovementUnlockNeeded = true;
};

SituationStage.prototype.afterMovementChange = function () {
    if (!this.spritesBodyMovementUnlockNeeded) return;
    this.spritesBodyMovementUnlockNeeded = false;

    for (var objectKey in this.roadObjectsFactory.roadObjects) {
        var object = this.roadObjectsFactory.roadObjects[objectKey];
        object.sprite.body.reset(object.sprite.x, object.sprite.y);
        if (this.startingVelocities[objectKey] !== undefined) {
            var velX = this.startingVelocities[objectKey].x;
            var velY = this.startingVelocities[objectKey].y;
            object.sprite.body.velocity.x = velX;
            object.sprite.body.velocity.y = velY;
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

/**
 * Add notification to this stage.
 * @param {String} id notification's id
 * @param {String} text notification's text
 * @param {Number} posX notification's pos x
 * @param {Number} posY notification's pos y
 */
SituationStage.prototype.addNotification = function (id, text, posX, posY) {
    this.notifications[id] = new Notification(this.game, id, text, posX, posY);
};

/**
 * Show/hide single notification.
 * @param {String}  id   notification's id
 * @param {Boolean} show show/not show
 */
SituationStage.prototype.setNotification = function (id, show) {
    this.getNotification(id).textObject.visible = show;
};

/**
 * Display notification with given time delay and duration.
 * @param {String} id       Notification's id.
 * @param {Number} delay    Notification's display start delay.
 * @param {Number} duration Notification's display duration.
 */
SituationStage.prototype.startNotification = function (id, delay, duration) {
    this.game.time.events.add(Phaser.Timer.SECOND * delay,
        function () {
            this.setNotification(id, true);
            this.game.time.events.add(Phaser.Timer.SECOND * duration,
                function () {
                    this.setNotification(id, false);
                }, this);
        }, this);
};

/**
 * Show/hide one notification after another.
 */
SituationStage.prototype.startNotificationChain = function (notifications) {
    for (var notId in notifications) {
        notification = notifications[notId];
        duration = notifications[notId].duration;
    }
};

SituationStage.prototype.getNotification = function (id) {
    return this.notifications[id];
};

/**
 * Add event (function) which will be invoked after given delay.
 * @param {Number}   delay Delay after which function will be invoked.
 * @param {Function} event Function invoked after given delay.
 */
SituationStage.prototype.addEvent = function (delay, event, context, arguments) {
    this.game.time.events.add(Phaser.Timer.SECOND * delay, event, context, arguments);
};

/**
 * Invoked when sthage is finished.
 */
SituationStage.prototype.setFinished = function () {
    this.manager.onStageFinished(this.number);
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
};

SituationStage.prototype.onStageButtonClick = function () {
    this.manager.situation.startStage(this.number)
};