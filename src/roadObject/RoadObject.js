SafeDrive = {};

RoadObject = function (factory, name, sprite, game) {

    this.factory = factory;
    this.name = name;

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
}

RoadObject.prototype.updateText = function () {
    this.text.text = this.name + " [" + this.sprite.x + ", " + this.sprite.y + "]";
};