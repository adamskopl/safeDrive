SafeDrive = {};

SafeDrive.RoadObject = function (name, sprite, game) {

    this.name = name;

    this.sprite = sprite;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();

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

SafeDrive.RoadObject.prototype.updateText = function () {
    this.text.text = this.name + " [" + this.sprite.x + ", " + this.sprite.y + "]";
};

/////////////////////////////////////////////////////////////////////////////

SafeDrive.RoadObjectFactory = function (game) {
    this.roadObjects = new Object();
    this.roadObjectsGroup = game.add.group();
    this.game = game;
};

SafeDrive.RoadObjectFactory.prototype.create = function (name) {

    var newSprite = this.roadObjectsGroup.create(0, 0, name);
    var newRObject = new SafeDrive.RoadObject(name, newSprite, this.game);

    this.roadObjects[name] = newRObject;

    return newRObject;
};

SafeDrive.RoadObjectFactory.prototype.get = function (objectName) {
    return this.roadObjects[objectName];
};

SafeDrive.RoadObjectFactory.prototype.callAll = function (functionToCall) {
    var objectsNumber = Object.keys(this.roadObjects).length;
    for (var propertyName in this.roadObjects) {
        functionToCall.call(this.get(propertyName));
    }
};