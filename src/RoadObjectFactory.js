SafeDrive.RoadObjectFactory = function (game) {
    this.roadObjects = new Object();
    this.roadObjectsGroup = game.add.group();
    this.game = game;

    this.testSingleFunctionInvoked = true;
    this.testSingleFunction = {};
    this.testSingleFunctionRoadObject = {};
};

SafeDrive.RoadObjectFactory.prototype.create = function (uniqueName, spriteName) {
    var newSprite = this.roadObjectsGroup.create(0, 0, spriteName);
    if (spriteName === 'jimmy') {
        newSprite.animations.add('left', [0, 1], 10, true);
        newSprite.animations.add('front', [2], 10, true);
    }

    var newRObject = new SafeDrive.RoadObject(this, uniqueName, newSprite, this.game);
    this.roadObjects[uniqueName] = newRObject;
    return newRObject;
};

SafeDrive.RoadObjectFactory.prototype.get = function (objectName) {
    return this.roadObjects[objectName];
};

SafeDrive.RoadObjectFactory.prototype.callAll = function (functionToCall) {
    var objectsNumber = Object.keys(this.roadObjects).length;
    for (var objectKey in this.roadObjects) {
        functionToCall.call(this.get(objectKey));
    }
};