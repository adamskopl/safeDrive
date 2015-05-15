/**
 * Add delayed event of setting velocity for an object
 * @param {Number} delay    dekay
 * @param {String} objectId object's id
 * @param {Number} velX     x velocity
 * @param {Number} velY     y velocity
 */
SituationStage.prototype.addEventVelocity = function (delay, objectId, velX, velY, accelX, accelY) {
    this.addEvent(delay, this.setVelocity, objectId, velX, velY, accelX, accelY);
}

/**
 * Add event (function) which will be invoked after given delay.
 * @param {Number}   delay Delay after which function will be invoked.
 * @param {Function} callback Function invoked after given delay.
 * @param {Array} callback arguments
 */
SituationStage.prototype.addEvent = function (delay, event) {
    callArgs = Array.prototype.splice.call(arguments, 2);
    // add event as a first argument to passed callback arguments
    callArgs.splice(0, 0, event);
    this.game.time.events.add(Phaser.Timer.SECOND * delay, this.fireEvent, this, callArgs);
};

/**
 * Events should be invoked through this function, because there's possibility,
 * that situation is already finished, and event should not be invoked.
 */
SituationStage.prototype.fireEvent = function (event) {
    args = Array.prototype.splice.call(arguments[0], 1);
    fun = event[0];
    fun.apply(this, args);
};

SituationStage.prototype.setVelocity = function (objectId, velX, velY, accelX, accelY) {
    this.getObject(objectId).setVelocity(velX, velY, accelX, accelY);
};