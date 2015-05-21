function SituationsManager(game, roadObjectsFactory, backgroundManipulator, fx) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;
    this.backgroundManipulator = backgroundManipulator;
    this.fx = fx;

    this.situations = [];
    // don't point on any situation
    this.situationsPointer = -1;

    this.initNotificationsFactoryManager();

    this.notificationsFactory = this.notificationsFactoryManager.createFactory(undefined, undefined);
    this.introNotificationsFactory = this.notificationsFactoryManager.createFactory(undefined, undefined);

    var margin = 5;
    this.buttonMenu = this.game.add.button(565 - margin, 0 + margin, 'reload', function () {
        this.backToMenu();
    }, this, 1, 0, 2, 0);
    this.buttonMenu.scale.setTo(0.75, 0.75);
    this.buttonMenu.setSounds(fx, 'click3', fx, 'click1');

    this.initLanguagesManager();
    this.initSituations();

    this.buttonMenu.visible = false;
}

SituationsManager.prototype.initNotificationsFactoryManager = function () {
    this.notificationsFactoryManager = new NotificationsFactoryManager(this.game, this.fx);
};

SituationsManager.prototype.initLanguagesManager = function () {
    this.languagesManager = new LanguagesManager(this.game, this.fx);
};

SituationsManager.prototype.initSituations = function () {
    var concrete_situations = [new Situation01(),
                               new Situation02(),
                               new Situation03(),
                               new Situation04(),
                               new Situation05()
                              ];

    var presenterSprite = this.game.add.sprite(440, 350, 'presenter');
    presenterSprite.scale.setTo(0.4, 0.4);
    if (!sConstants.PRESENTER_VISIBLE) {
        presenterSprite.visible = false;
    }

    // keeps the biggest width
    var widestNotif = 0;
    for (var i = 0; i < concrete_situations.length; i++) {
        var concrete_situation = concrete_situations[i];

        var newSituation = new Situation(this.game, this.roadObjectsFactory,
            this.notificationsFactoryManager, this,
            concrete_situation, presenterSprite, this.fx);
        this.pushNewSituation(newSituation);

        var x = 160;
        if (i % 2 === 1) {
            x = 480;
        }
        var y = 40 + 100 * i;
        y = (this.game.math.roundTo((i + 1) / 2, 0)) * 120;

        var notifWide = this.notificationsFactory.addNotification(
            i, concrete_situation.title,
            x, y,
            this.startSituation, this, i).width;
        if (notifWide > widestNotif) widestNotif = notifWide;

        // reset objects for correct Situation.prototype.initStage invoke
        this.roadObjectsFactory.reset();
    };
    // set the same width for all notifications
    for (var i = 0; i < concrete_situations.length; i++) {
        var notif = this.notificationsFactory.getNotification(i);
        notif.width = widestNotif;
    }

    //    this.startMenu();
    this.startIntroNotification();

    // uncomment to automatically start desired situation
    if (sConstants.DEBUG) {
        this.game.time.events.add(300, this.startSituation, this, sConstants.DEBUG_SITUATION);
    }

}

SituationsManager.prototype.getCurrentSituation = function () {
    return this.situations[this.situationsPointer];
};

this.SituationsManager.prototype.startIntroNotification = function () {
    this.introNotificationsFactory.addNotification("introNotif", {
        pl: [
        "Prezentacja przedstawia niebezpieczne",
        "sytaucje drogowe.",
        "Aby kontynować działanie, należy klikać",
        "na pomarańczowe przyciski."],
        en: []
    }, -1, -1, this.startMenu, this);
    this.introNotificationsFactory.setNotification("introNotif", true);

};

SituationsManager.prototype.startMenu = function () {
    this.roadObjectsFactory.reset();
    this.backgroundManipulator.resetZoom();
    this.notificationsFactory.startAllNotifications(0);
    this.buttonMenu.visible = false;
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
    if (!sConstants.DEBUG) {
        ss.notificationsFactory.startNotification(ss.concreteSituation.instructionTexts.bad.name, 0);
    } else {
        ss.startSituation();
    }
    this.situationsPointer = number;
    this.buttonMenu.visible = true;
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