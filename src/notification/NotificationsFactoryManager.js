function NotificationsFactoryManager(game, fx) {
    this.game = game;
    this.fx = fx;

    this.factories = [];

    this.languagesManager = new LanguagesManager(this.game, this, this.fx);
}

NotificationsFactoryManager.prototype.createFactory = function (instructionTexts, presenterSprite,
    sameWidth) {

    var newFactory = new NotificationsFactory(this.game, instructionTexts, presenterSprite, this.fx, sameWidth);
    this.factories.push(newFactory);

    return newFactory;
};

NotificationsFactoryManager.prototype.onLanguageChange = function (language) {
    this.factories.forEach(function (factory) {
        factory.onLanguageChange(language);
    });
};