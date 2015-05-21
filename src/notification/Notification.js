/**
 * Notification: a positioned text box.
 * @param {Object}   factory         [[Description]]
 * @param {Object}   game            Phaser.Game
 * @param {String}   id              notification's id
 * @param {Array}    textArray       array of strings do display
 * @param {Object}   presenterSprite presenter's sprite
 * @param {Number}   x               pos x.
 *                                   if undefined, position will be taken from presenterSprite
 *                                   if === -1, position will be centered
 *                                   if === 1, position will be in the right down corner
 * @param {Number}   y               pos y.
 *                                   if undefined, position will be taken from presenterSprite
 *                                   if === -1, position will be centered
 *                                   if === 1, position will be in the right down corner
 *
 * @param {Object}   fx              Phaser.Sound
 * @param {Function} callback        callback function (on notification confirmation)
 * @param {Object}   callbackContext callback context
 * @param {Array}    callArgs        callback arguments
 */
function Notification(factory, game, id, textArray, presenterSprite, x, y, fx,
    callback, callbackContext, callArgs) {

    this.factory = factory;
    this.game = game;
    this.fx = fx;
    this.callback = callback;
    this.callbackContext = callbackContext;
    this.callArgs = callArgs;

    this.id = id;

    this.languageTextArrays = textArray;
    this.languageTextObjects = {
        pl: [],
        en: []
    };

    this.presenterSprite = presenterSprite;
    this.margins = 15;
    this.fx = fx;

    if (x === undefined) {
        this.notificationX = this.presenterSprite.x;
        this.notificationY = this.presenterSprite.y;
    } else if (x === -1 && y === -1) {
        this.notificationX = 640 / 2;
        this.notificationY = 480 / 2;
    } else {
        this.notificationX = x;
        this.notificationY = y;
    }

    this.tweenFunction = Phaser.Easing.Linear.None;

    this.initButton();

    this.initTextObjects(this.languageTextArrays.pl, this.languageTextObjects.pl);

}

Notification.prototype.initButton = function () {

    var textArray = this.languageTextArrays.pl;

    this.growSpeed = 200;
    this.width = 13 * this.getWidth(textArray) + this.margins;
    this.height = 32 * textArray.length + 20;
    if (this.notificationX === 1 && this.notificationY === 1) {
        var margin = 20;
        this.notificationX = 640 - this.width / 2 - margin;
        this.notificationY = 480 - this.height / 2 - margin;
    }

    this.button = {
        buttonPhaser: this.game.add.button(
            this.notificationX, this.notificationY,
            'button', this.buttonClicked, this,
            1, 0, 2, 0),
        frameUp: this.game.add.sprite(this.notificationX, this.notificationY + this.height / 2, 'button_border_normal'),
        frameDown: this.game.add.sprite(this.notificationX, this.notificationY - this.height / 2, 'button_border_pressed'),
        callback: this.callback,
        callbackContext: this.callbackContext,
        args: this.callArgs
    };

    this.button.buttonPhaser.setSounds(this.fx, 'click3', this.fx, 'click1');
    this.button.buttonPhaser.anchor.setTo(0.5, 0.5);
    this.button.frameUp.anchor.setTo(0.5, 0.5);
    this.button.frameDown.anchor.setTo(0.5, 0.5);
    this.button.buttonPhaser.visible = false;
    this.button.frameUp.visible = false;
    this.button.frameUp.height = 3;
    this.button.frameDown.visible = false;
    this.button.frameDown.height = 3;

    this.button.buttonPhaser.onInputDown.add(function () {
        this.button.frameUp.visible = false;
        this.button.frameDown.visible = true;
    }, this);
};

Notification.prototype.initTextObjects = function (languageTextArray, languageTextObjectArray) {
    languageTextArray.forEach(function (entry) {
        var newText = this.game.add.text(-999, -999, entry, {
            font: "25px Arial",
            fill: '#FFFFFF'
        });
        newText.anchor.setTo(0, 0);
        newText.visible = false;
        languageTextObjectArray.push(newText);
    }, this);
};

Notification.prototype.buttonClicked = function () {
    this.factory.setNotification(this.id, false);
    this.button.callback.apply(this.button.callbackContext, this.button.args);
};

Notification.prototype.update = function () {
    var y = this.notificationY - this.height / 2 + this.margins;
    this.languageTextObjects.pl.forEach(function (entry) {
        entry.x = this.notificationX - this.width / 2 + this.margins;
        entry.y = y;
        y += 30;
    }, this);
};


Notification.prototype.addGrowTween = function (target, tweenObject) {
    var tween = this.game.add.tween(target).to(tweenObject,
        this.growSpeed, this.tweenFunction, true);
    return tween;
};

Notification.prototype.buttonGrow = function () {
    this.button.buttonPhaser.alpha = 1;
    this.button.buttonPhaser.visible = true;
    this.button.frameDown.visible = false;
    this.button.frameUp.visible = true;

    this.addGrowTween(this.button.buttonPhaser, {
        width: this.width
    });
    this.addGrowTween(this.button.frameUp, {
        width: this.width
    });
    this.addGrowTween(this.button.frameDown, {
        width: this.width
    })
    this.addGrowTween(this.button.buttonPhaser, {
        height: this.height
    });
};

Notification.prototype.buttonShrink = function () {
    this.button.frameDown.visible = false;
    this.button.frameUp.visible = false;

    this.addGrowTween(this.button.buttonPhaser, {
            width: 1
        })
        .onComplete.add(function () {
            this.visible = false;
            this.alpha = 0;
        }, this.button.buttonPhaser);

    this.addGrowTween(this.button.frameUp, {
        width: 1
    });
    this.addGrowTween(this.button.frameDown, {
        width: 1
    });
    this.addGrowTween(this.button.buttonPhaser, {
        height: 1
    });
};

Notification.prototype.getWidth = function (textArray) {
    var width = 0;
    textArray.forEach(function (entry) {
        if (entry.length > width) width = entry.length;
    });
    return width;
}