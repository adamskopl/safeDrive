SafeDrive = {};

RoadObject = function (factory, name, sprite, game) {

    this.factory = factory;
    this.name = name;
    this.game = game;

    this.sprite = sprite;
    this.sprite.name = name;
    this.sprite.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;

    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();

    this.sprite.events.onDragStart.add(function (sprite) {
        sprite.body.moves = false;
    }, this, this);

    this.sprite.events.onDragStop.add(function (sprite) {
        // reset body with current sprite's position
        sprite.body.reset(sprite.x, sprite.y);
        sprite.body.moves = true;
    }, this, this);

    this.text = game.add.text(0, 0, '', {
        font: "10px Arial",
        fill: '#de1f1f'
    });

    return this;
};

/**
 * Reset object:
 */
RoadObject.prototype.reset = function () {
    var offCoordinate = 9999;
    this.sprite.x = offCoordinate;
    this.sprite.y = offCoordinate;
    var body = this.sprite.body;

    body.moves = false;
    body.velocity.x = 0;
    body.velocity.y = 0;
    body.acceleration.x = 0;
    body.acceleration.y = 0;
};

RoadObject.prototype.setPos = function (x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
};

RoadObject.prototype.setTextPos = function (x, y) {
    this.text.x = x;
    this.text.y = y;
};

RoadObject.prototype.setVelocity = function (velX, velY, accelX, accelY) {

    var newAccelX = accelX;
    var newAccelY = accelY;
    if (accelX === undefined) newAccelX = 0;
    if (accelY === undefined) newAccelY = 0;

    this.sprite.body.velocity.x = velX;
    this.sprite.body.velocity.y = velY;
    this.sprite.body.acceleration.x = newAccelX;
    this.sprite.body.acceleration.y = newAccelY;
};

RoadObject.prototype.updateText = function () {
    this.text.text = this.name + " [" + this.sprite.x + ", " + this.sprite.y + "]";
};

RoadObject.prototype.startObjectTurn = function (pivotObjectName, velocity, callback, callbackContext) {
    this.rotationAngle = {
        angle: 0
    };
    this.rotationMem = 0;
    var pivotObject = this.factory.get(pivotObjectName);
    this.pivotX = pivotObject.sprite.x;
    this.pivotY = pivotObject.sprite.y;

    this.game.add.tween(this.sprite).to({
        angle: 180
    }, velocity, Phaser.Easing.Linear.In, true, 0, 0);

    var tweenRotation = this.game.add.tween(this.rotationAngle).to({
        angle: 90
    }, velocity, Phaser.Easing.Linear.In, true, 0, 0);

    tweenRotation.onUpdateCallback(function () {
        this.diff = this.rotationAngle.angle - this.rotationMem;
        this.rotationMem = this.rotationAngle.angle;
        this.sprite.position.rotate(this.pivotX, this.pivotY, this.game.math.wrapAngle(this.diff), true);
    }, this);

    // set new body size
    tweenRotation.onComplete.add(function () {
        this.sprite.body.setSize(this.sprite.width, this.sprite.height);
    }, this);
    tweenRotation.onComplete.add(callback, callbackContext);

};