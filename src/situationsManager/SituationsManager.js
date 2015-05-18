function SituationsManager(game, roadObjectsFactory, backgroundManipulator, fx) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;
    this.backgroundManipulator = backgroundManipulator;
    this.fx = fx;

    this.situations = [];
    // don't point on any situation
    this.situationsPointer = -1;
    this.notificationsFactory = new NotificationsFactory(this.game, undefined, undefined, fx);

    this.initSituations();

    this.buttonMenu = this.game.add.button(550, 400, 'reload', function () {
        this.backToMenu();
        this.fx.play("numkey");
    }, this, 1, 0, 1);
    this.buttonMenu.scale.setTo(0.2, 0.2);
}

SituationsManager.prototype.initSituations = function () {
    var concrete_situations = [new Situation01(),
                               new Situation02(),
                               new Situation03(),
                              ];

    var presenterSprite = this.game.add.sprite(440, 350, 'presenter');
    presenterSprite.scale.setTo(0.4, 0.4);
    presenterSprite.visible = false;

    for (var i = 0; i < concrete_situations.length; i++) {
        var concrete_situation = concrete_situations[i];
        var newSituation = new Situation(this.game, this.roadObjectsFactory, this, concrete_situation, presenterSprite, this.fx);
        this.pushNewSituation(newSituation);

        this.notificationsFactory.addNotification(i, concrete_situation.title, 200, 100 + 100 * i);
        this.notificationsFactory.getNotification(i).addConfirmButton(
            this.startSituation, this, i);

        // reset objects for correct Situation.prototype.initStage invoke
        this.roadObjectsFactory.reset();
    };
    this.startMenu();

    // uncomment to automatically start desired situation
    this.game.time.events.add(300, this.startSituation, this, 1);

}

SituationsManager.prototype.getCurrentSituation = function () {
    return this.situations[this.situationsPointer];
};

SituationsManager.prototype.startMenu = function () {
    this.roadObjectsFactory.reset();
    this.backgroundManipulator.resetZoom();
    this.notificationsFactory.startAllNotifications(0);
};

SituationsManager.prototype.backToMenu = function () {
    if (this.situationsPointer !== -1) {
        this.getCurrentSituation().setFinished();
        this.situationsPointer = -1;
    }
    this.startMenu();
};

SituationsManager.prototype.startSituation = function (number) {

    // turn off every situation notifications
    for (key in this.notificationsFactory.notifications) {
        // except for the one just clicked
        if (key === number) continue;
        this.notificationsFactory.setNotification(key, false);
    }

    var ss = this.situations[number];
    var sectorCoords = ss.getSector();
    this.backgroundManipulator.zoomToSector(sectorCoords.x, sectorCoords.y);
    // start stage's introduction notification which will start the situation
    //    ss.notificationsFactory.startNotification(ss.concreteSituation.instructionTexts.bad.name, 0);

    ss.startSituation();
    this.situationsPointer = number;
};

SituationsManager.prototype.pushNewSituation = function (NewSituation) {
    this.situations.push(NewSituation);
};

SituationsManager.prototype.update = function () {
    if (this.situationsPointer === -1 || !this.getCurrentSituation().isInProgress()) return;

    this.getCurrentSituation().update(this.game);
};

/**
 * Invoked by a Situation.
 * Assumption: only situation invoking this function is the only active one.
 */
SituationsManager.prototype.onCurrentSituationFinished = function () {
    this.startMenu();
};