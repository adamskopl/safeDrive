/**
 * Notification: a positioned text box.
 * @param {Object} game Phaser.Game
 * @param {String} id   notification's id
 * @param {String} text notification's text
 * @param {Number} posX notification's pos x
 * @param {Number} posY notification's pos y
 */
function Notification(game, id, text, roadObject) {
    this.game = game;
    this.id = id;
    this.text = text;
    this.roadObject = roadObject;

    var newText = game.add.text(-999, -999, this.text, {
        font: "20px Arial",
        fill: '#b52626',
        backgroundColor: 'rgb(0,255,0,0.25)' // not working...
    });

    newText.inputEnabled = true;
    newText.input.enableDrag();
    newText.visible = false;
    this.textObject = newText;
}

Notification.prototype.update = function () {
    this.textObject.x = this.roadObject.sprite.x;
    this.textObject.y = this.roadObject.sprite.y;
};