function SituationsManager(game, roadObjectsFactory) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;

    this.situations = [];
    this.situationsPointer = 0;
    this.notificationsFactory = new NotificationsFactory(this.game, undefined, undefined);

    this.initSituations();
}

SituationsManager.prototype.initSituations = function () {
    var concrete_situations = [new Situation01(),
                               new Situation02(),
                               new Situation03(),
                              ];

    var presenterSprite = this.game.add.sprite(250, 450, 'presenter');
    presenterSprite.scale.setTo(0.4, 0.4);
    presenterSprite.visible = false;

    for (var i = 0; i < concrete_situations.length; i++) {
        var concrete_situation = concrete_situations[i];
        var newSituation = new Situation(this.game, this.roadObjectsFactory, concrete_situation, presenterSprite);
        this.pushNewSituation(newSituation);

        this.notificationsFactory.addNotification(i, concrete_situation.title, 200, 100 + 100 * i);
        this.notificationsFactory.getNotification(i).addConfirmButton(
            this.startSituation, this, i);
    };

    this.startMenu();

}

SituationsManager.prototype.startMenu = function () {
    this.notificationsFactory.startAllNotifications(0);
};

SituationsManager.prototype.startSituation = function (number) {

    // turn off every situation notifications
    for (key in this.notificationsFactory.notifications) {
        // except for the one just clicked
        if (key === number) continue;
        this.notificationsFactory.setNotification(key, false);
    }

    var ss = this.situations[number];
    // start stage's introduction notification which will start the situation
    ss.notificationsFactory.startNotification(ss.concreteSituation.instructionTexts.bad.name, 0);
    this.situationsPointer = number;
};

SituationsManager.prototype.pushNewSituation = function (NewSituation) {
    this.situations.push(NewSituation);
};

SituationsManager.prototype.update = function () {
    this.situations[this.situationsPointer].update(this.game);
}