/**
 * Notification: a positioned text box.
 * @param {Object}   game       Phaser.Game
 * @param {String}   id         notification's id
 * @param {Array}    textArray  [[Description]]
 * @param {Object} presenter  [[Description]]
 */
function Notification(factory, game, id, textArray, presenterSprite, x, y) {
    this.game = game;
    this.factory = factory;
    this.id = id;
    this.texts = [];
    this.presenterSprite = presenterSprite;
    this.margins = 15;

    if (x === undefined) {
        this.notificationX = this.presenterSprite.x + 2 * this.presenterSprite.width;
        this.notificationY = this.presenterSprite.y;
    } else {
        this.notificationX = x;
        this.notificationY = y;
    }

    this.initBalloon(textArray);

    textArray.forEach(function (entry) {
        var newText = game.add.text(-999, -999, entry, {
            font: "20px Arial",
            fill: '#b52626',
            backgroundColor: 'rgb(0,255,0,0.25)' // not working...
        });
        newText.anchor.setTo(0, 0);

        newText.inputEnabled = true;
        newText.input.enableDrag();
        newText.visible = false;
        this.texts.push(newText);
    }, this);
}

/**
 * If notification has a button, then balloon shrinks only when button is pressed.
 * @param {Function} callback        callback function
 * @param {Object}   callbackContext callback context
 * @param {...*}     arguments Additional arguments
 */
Notification.prototype.addConfirmButton = function (callback, callbackContext) {

    var buttonMargin = 0;
    var buttonX = this.notificationX + this.width / 2 + buttonMargin;
    var buttonY = this.notificationY + this.height / 2 + buttonMargin;

    this.button = {
        buttonPhaser: this.game.add.button(buttonX, buttonY, 'oknotok', this.buttonClicked, this, 1, 0, 1),
        callback: callback,
        callbackContext: callbackContext,
        // seen in Phaser source code :) (Timer.js#L245) sweet.
        args: Array.prototype.splice.call(arguments, 2)
    };

    this.button.buttonPhaser.anchor.setTo(0.5, 0.5);
    this.button.buttonPhaser.scale.setTo(0.3, 0.3);
    this.button.buttonPhaser.visible = false;

}

Notification.prototype.buttonClicked = function () {
    this.factory.setNotification(this.id, false);
    //    this.button.callback.call(this.button.callbackContext);
    this.button.callback.apply(this.button.callbackContext, this.button.args);
};

Notification.prototype.hasButton = function () {
    return (this.button !== undefined);
};

Notification.prototype.update = function () {
    var y = this.balloon.y - this.height / 2 + this.margins;
    this.texts.forEach(function (entry) {
        entry.x = this.balloon.x - this.width / 2 + this.margins;
        entry.y = y;
        y += 30;
    }, this);
};

Notification.prototype.initBalloon = function (textArray) {
    var balloon = this.game.add.sprite(this.notificationX, this.notificationY, 'balloonBackground');
    this.growSpeed = 200;
    this.width = 10 * this.getWidth(textArray) + this.margins;
    this.height = 32 * textArray.length + 10;

    balloon.width = 1;
    balloon.height = 1;

    balloon.anchor.setTo(0.5, 0.5);
    balloon.visible = false;

    this.balloon = balloon;
};

Notification.prototype.balloonGrow = function () {
    this.balloon.visible = true;
    if (this.hasButton()) {
        this.button.buttonPhaser.visible = true;
    }
    this.game.add.tween(this.balloon).to({
        width: this.width
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);

    this.game.add.tween(this.balloon).to({
        height: this.height
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);

    this.game.add.tween(this.balloon).to({
        height: this.height
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);
};

Notification.prototype.balloonShrink = function () {
    if (this.hasButton()) {
        this.button.buttonPhaser.visible = false;
    }
    this.game.add.tween(this.balloon).to({
        width: 1
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);

    this.game.add.tween(this.balloon).to({
        height: 1
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);
};

Notification.prototype.getWidth = function (textArray) {
    var width = 0;
    textArray.forEach(function (entry) {
        if (entry.length > width) width = entry.length;
    });
    return width;
}