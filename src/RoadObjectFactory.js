RoadObjectFactory = function (game) {
    this.roadObjects = new Object();
    this.roadObjectsGroup = game.add.group();
    this.game = game;

    this.testSingleFunctionInvoked = true;
    this.testSingleFunction = {};
    this.testSingleFunctionRoadObject = {};
};

RoadObjectFactory.prototype.create = function (id, spriteName) {
    var newSprite = this.roadObjectsGroup.create(0, 0, spriteName);
    if (spriteName === 'jimmy') {
        newSprite.animations.add('left', [0, 1], 10, true);
        newSprite.animations.add('front', [2], 10, true);
    }

    var newRObject = new SafeDrive.RoadObject(this, id, newSprite, this.game);
    this.roadObjects[id] = newRObject;
    return newRObject;
};

RoadObjectFactory.prototype.objectExists = function (id) {
    return this.roadObjects[id] !== undefined;
};

RoadObjectFactory.prototype.get = function (id) {
    return this.roadObjects[id];
};

RoadObjectFactory.prototype.callAll = function (functionToCall) {
    var objectsNumber = Object.keys(this.roadObjects).length;
    for (var objectKey in this.roadObjects) {
        functionToCall.call(this.get(objectKey));
    }
};