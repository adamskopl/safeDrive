SafeDrive = {};

SafeDrive.RoadObject = function (name, sprite, game) {

    this.name = name;

    this.sprite = sprite;
    this.sprite.name = name;
    this.sprite.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;

    // uncomment to enable dragging
    // TODO: check 'gravity and drag' Phaser Example for dragging + physics 
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();

    this.sprite.events.onDragStart.add(function (sprite) {
        sprite.body.moves = false;
    }, this, this);

    this.text = game.add.text(0, 0, '', {
        font: "20px Arial",
        fill: '#FFF'
    });

    return this;
};

function startDrag(sprite) {
    sprite.body.moves = false;
}

SafeDrive.RoadObject.prototype.setPos = function (x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
};

SafeDrive.RoadObject.prototype.setTextPos = function (x, y) {
    this.text.x = x;
    this.text.y = y;
};

SafeDrive.RoadObject.prototype.updateText = function () {
    this.text.text = this.name + " [" + this.sprite.x + ", " + this.sprite.y + "]";
};

/////////////////////////////////////////////////////////////////////////////