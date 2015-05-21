function LanguagesManager(game, fx) {
    this.game = game;
    this.fx = fx;

    this.posY = 390;

    this.scale = 0.75;

    this.buttonPL = this.game.add.button(270, this.posY, 'button_pl',
        LanguagesManager.prototype.buttonClickedPL, this,
        1, 0, 2, 0);
    this.buttonEN = this.game.add.button(270 + 100, this.posY, 'button_en',
        LanguagesManager.prototype.buttonClickedEN, this,
        1, 0, 2, 0);

    this.buttonPL.setSounds(this.fx, 'click3', this.fx, 'click1');
    this.buttonEN.setSounds(this.fx, 'click3', this.fx, 'click1');

    this.buttonPL.anchor.setTo(0.5, 0.5);
    this.buttonEN.anchor.setTo(0.5, 0.5);

    this.buttonPL.scale.setTo(this.scale, this.scale);
    this.buttonEN.scale.setTo(this.scale, this.scale);
}

LanguagesManager.prototype.buttonClickedPL = function () {};


LanguagesManager.prototype.buttonClickedEN = function () {

};