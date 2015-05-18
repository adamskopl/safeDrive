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
    } else if (spriteName === 'bike') {
        newSprite.animations.add('ride', [0, 0], 0, true);
        newSprite.animations.add('walk', [1, 1], 0, true);
    }

    var newRObject = new RoadObject(this, id, newSprite, this.game);
    this.roadObjects[id] = newRObject;
    return newRObject;
};

/**
 * Reset all objects: give them offscreen positions
 * plus set velocities and accelerations to zero.
 */
RoadObjectFactory.prototype.reset = function () {
    this.callAll(RoadObject.prototype.reset);
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