function NotificationsFactoryManager(game, fx) {
    this.game = game;
    this.fx = fx;

    this.factories = [];
}

NotificationsFactoryManager.prototype.createFactory = function (instructionTexts, presenterSprite) {

    var newFactory = new NotificationsFactory(this.game, instructionTexts, presenterSprite, this.fx);
    this.factories.push(newFactory);

    return newFactory;
};