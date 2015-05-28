function LanguagesManager(game, notificationsFactoryManager, fx) {
    this.game = game;
    this.notificationsFactoryManager = notificationsFactoryManager;
    this.fx = fx;

    this.buttonPL = this.game.add.button(0, 0, 'button_pl',
        LanguagesManager.prototype.buttonClickedPL, this,
        1, 0, 2, 0);
    this.buttonEN = this.game.add.button(0, 0, 'button_en',
        LanguagesManager.prototype.buttonClickedEN, this,
        1, 0, 2, 0);

    var scale = 0.5;
    var margin = 10;
    var size = this.buttonPL.width;
    var posY = margin + size * scale / 2;

    this.buttonPL.position.setTo(size * scale / 2 + margin, posY);
    this.buttonEN.position.setTo(size * scale / 2 + size * scale + 2 * margin, posY);

    this.buttonPL.setSounds(this.fx, 'click3', this.fx, 'click1');
    this.buttonEN.setSounds(this.fx, 'click3', this.fx, 'click1');

    this.buttonPL.anchor.setTo(0.5, 0.5);
    this.buttonEN.anchor.setTo(0.5, 0.5);

    this.buttonPL.scale.setTo(scale, scale);
    this.buttonEN.scale.setTo(scale, scale);

    if (!sConstants.TRANSLATION) {
        this.buttonPL.visible = false;
        this.buttonEN.visible = false;
    }
}

LanguagesManager.prototype.buttonClickedPL = function () {
    this.notificationsFactoryManager.onLanguageChange(constantsLanguages.PL);
};


LanguagesManager.prototype.buttonClickedEN = function () {
    this.notificationsFactoryManager.onLanguageChange(constantsLanguages.EN);
};