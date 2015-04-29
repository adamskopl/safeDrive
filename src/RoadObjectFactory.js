SafeDrive.RoadObjectFactory = function (game) {
    this.roadObjects = new Object();
    this.roadObjectsGroup = game.add.group();
    this.game = game;
};

SafeDrive.RoadObjectFactory.prototype.create = function (spriteName, id) {
    var uniqueName = spriteName + id;
    var newSprite = this.roadObjectsGroup.create(0, 0, spriteName);
    var newRObject = new SafeDrive.RoadObject(uniqueName, newSprite, this.game);
    this.roadObjects[uniqueName] = newRObject;

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