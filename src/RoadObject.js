SafeDrive = {};

SafeDrive.RoadObject = function (factory, name, sprite, game) {

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
        font: "20px Arial",
        fill: '#FFF'
    });

    return this;
};

SafeDrive.RoadObject.prototype.setPos = function (x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
};

SafeDrive.RoadObject.prototype.setTextPos = function (x, y) {
    this.text.x = x;
    this.text.y = y;
};

SafeDrive.RoadObject.prototype.setVelocity = function (velX, velY) {
    this.sprite.body.velocity.x = velX;
    this.sprite.body.velocity.y = velY;
}

SafeDrive.RoadObject.prototype.updateText = function () {
    this.text.text = this.name + " [" + this.sprite.x + ", " + this.sprite.y + "]";
};