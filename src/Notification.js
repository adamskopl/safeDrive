/**
 * Notification: a positioned text box.
 * @param {Object} game Phaser.Game
 * @param {String} id   notification's id
 * @param {String} text notification's text
 * @param {Number} posX notification's pos x
 * @param {Number} posY notification's pos y
 */
function Notification(game, id, text, posX, posY) {
    this.id = id;
    this.text = text;
    this.x = posX;
    this.y = posY;

    var newText = game.add.text(this.x, this.y, this.text, {
        font: "20px Arial",
        fill: '#ffffff',
        backgroundColor: 'rgb(0,255,0,0.25)' // not working...
    });

    newText.inputEnabled = true;
    newText.input.enableDrag();
    newText.visible = false;

    this.textObject = newText;
}