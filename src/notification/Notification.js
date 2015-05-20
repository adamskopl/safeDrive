/**
 * Notification: a positioned text box.
 * @param {Object}   game       Phaser.Game
 * @param {String}   id         notification's id
 * @param {Array}    textArray  [[Description]]
 * @param {Object} presenter  [[Description]]
 */
function Notification(factory, game, id, textArray, presenterSprite, x, y, fx,
    callback, callbackContext, callArgs) {

    this.game = game;
    this.factory = factory;
    this.id = id;
    this.texts = [];
    this.presenterSprite = presenterSprite;
    this.margins = 15;
    this.fx = fx;

    if (x === undefined) {
        this.notificationX = this.presenterSprite.x;
        this.notificationY = this.presenterSprite.y;
    } else {
        this.notificationX = x;
        this.notificationY = y;
    }

    this.tweenFunction = Phaser.Easing.Linear.None;

    this.initBalloon(textArray);

    this.buttonNew = {
        buttonPhaser: this.game.add.button(
            this.notificationX, this.notificationY,
            'button', this.buttonClicked_PROPER, this,
            1, 0, 2, 0),
        frameUp: this.game.add.sprite(this.notificationX, this.notificationY + this.height / 2, 'button_border_normal'),
        frameDown: this.game.add.sprite(this.notificationX, this.notificationY - this.height / 2, 'button_border_pressed'),
        callback: callback,
        callbackContext: callbackContext,
        args: callArgs
    };

    this.buttonNew.buttonPhaser.setSounds(fx, 'click3', fx, 'click1');
    this.buttonNew.buttonPhaser.anchor.setTo(0.5, 0.5);
    this.buttonNew.frameUp.anchor.setTo(0.5, 0.5);
    this.buttonNew.frameDown.anchor.setTo(0.5, 0.5);
    this.buttonNew.buttonPhaser.visible = false;
    this.buttonNew.frameUp.visible = false;
    this.buttonNew.frameUp.height = 3;
    this.buttonNew.frameDown.visible = false;
    this.buttonNew.frameDown.height = 3;

    this.buttonNew.buttonPhaser.onInputDown.add(function () {
        this.buttonNew.frameUp.visible = false;
        this.buttonNew.frameDown.visible = true;
    }, this);

    textArray.forEach(function (entry) {
        var newText = game.add.text(-999, -999, entry, {
            font: "25px Arial",
            fill: '#FFFFFF'
        });
        newText.anchor.setTo(0, 0);
        newText.visible = false;
        this.texts.push(newText);
    }, this);

}

Notification.prototype.buttonClicked_PROPER = function () {
    this.factory.setNotification(this.id, false);
    this.buttonNew.callback.apply(this.buttonNew.callbackContext, this.buttonNew.args);
};

Notification.prototype.update = function () {
    var y = this.notificationY - this.height / 2 + this.margins;
    this.texts.forEach(function (entry) {
        entry.x = this.notificationX - this.width / 2 + this.margins;
        entry.y = y;
        y += 30;
    }, this);
};
Notification.prototype.initBalloon = function (textArray) {
    this.growSpeed = 200;
    this.width = 13 * this.getWidth(textArray) + this.margins;
    this.height = 32 * textArray.length + 20;
};

Notification.prototype.addGrowTween = function (target, tweenObject) {
    var tween = this.game.add.tween(target).to(tweenObject,
        this.growSpeed, this.tweenFunction, true);
    return tween;
};

Notification.prototype.balloonGrow = function () {
    this.buttonNew.buttonPhaser.alpha = 1;
    this.buttonNew.buttonPhaser.visible = true;
    this.buttonNew.frameDown.visible = false;
    this.buttonNew.frameUp.visible = true;

    this.addGrowTween(this.buttonNew.buttonPhaser, {
        width: this.width
    });
    this.addGrowTween(this.buttonNew.frameUp, {
        width: this.width
    });
    this.addGrowTween(this.buttonNew.frameDown, {
        width: this.width
    })
    this.addGrowTween(this.buttonNew.buttonPhaser, {
        height: this.height
    });
};

Notification.prototype.balloonShrink = function () {
    this.buttonNew.frameDown.visible = false;
    this.buttonNew.frameUp.visible = false;

    this.addGrowTween(this.buttonNew.buttonPhaser, {
            width: 1
        })
        .onComplete.add(function () {
            this.visible = false;
            this.alpha = 0;
        }, this.buttonNew.buttonPhaser);

    this.addGrowTween(this.buttonNew.frameUp, {
        width: 1
    });
    this.addGrowTween(this.buttonNew.frameDown, {
        width: 1
    });
    this.addGrowTween(this.buttonNew.buttonPhaser, {
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