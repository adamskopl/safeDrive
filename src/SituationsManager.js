function SituationsManager(game, roadObjectsFactory) {
    this.game = game;
    this.roadObjectsFactory = roadObjectsFactory;

    this.situations = [];
    this.situationsPointer = 0;

    this.initSituations();
}

SituationsManager.prototype.initSituations = function () {
    var situation01 = new Situation01(this.game, this.roadObjectsFactory);
    this.pushNewSituation(situation01);
};

SituationsManager.prototype.pushNewSituation = function (NewSituation) {
    this.situations.push(NewSituation);
};

SituationsManager.prototype.update = function () {
    this.situations[this.situationsPointer].update(this.game);
}