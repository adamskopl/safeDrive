/**
 * Notification: a positioned text box.
 * @param {Object}   game       Phaser.Game
 * @param {String}   id         notification's id
 * @param {Array}    textArray  [[Description]]
 * @param {Object}   roadObject [[Description]]
 * @param {Object} presenter  [[Description]]
 */
function Notification(game, id, textArray, roadObject, presenter) {
    this.game = game;
    this.id = id;
    this.texts = [];
    this.roadObject = roadObject;
    this.presenter = presenter;
    this.margins = 15;

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

Notification.prototype.update = function () {
    var y = this.balloon.y - this.height / 2 + this.margins;
    this.texts.forEach(function (entry) {
        entry.x = this.balloon.x - this.width / 2 + this.margins;
        entry.y = y;
        y += 30;
    }, this);
};

Notification.prototype.initBalloon = function (textArray) {

    var balloon = this.game.add.sprite(this.presenter.x + 2 * this.presenter.width, this.presenter.y, 'balloonBackground');
    this.growSpeed = 200;
    this.width = 10 * textArray[0].length + this.margins;
    this.height = 40 * textArray.length;

    balloon.width = 1;
    balloon.height = 1;

    balloon.anchor.setTo(0.5, 0.5);
    balloon.visible = false;

    this.balloon = balloon;

};

Notification.prototype.balloonGrow = function () {
    this.balloon.visible = true;
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
    this.game.add.tween(this.balloon).to({
        width: 1
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);

    this.game.add.tween(this.balloon).to({
        height: 1
    }, this.growSpeed, Phaser.Easing.Linear.None, true, this.growSpeed, 0, true);
};