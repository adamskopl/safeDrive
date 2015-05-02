Situation01.prototype.initStages = function () {
    this.initStage(0);
    this.initStage(1);
    this.startStage(0);
};

Situation01.prototype.startStage = function (stageNumber) {
    this.resetCollisionCheck();
    this.situationStagesManager.getStage(stageNumber).start();
};

Situation01.prototype.initStage = function (stageNumber) {
    var stage;
    switch (stageNumber) {
    case 0:
        this.pedestrianASpeed = -30;

        stage = new SituationStage(this.situationStagesManager, this.game, this.roadObjectsFactory);

        stage.addStartingVelocity("carA", 0, -80);
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);

        stage.addCollisionHandler("triggerA", "carA",
            function () {
                this.getObject("carA").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);

                this.startNotification("pedestrianNotification", 0, 0.5);
                this.startNotification("carANotification", 0.5, 0.5);
                this.addEvent(1, this.setFinished, this);
            }
        );

        stage.addNotification("pedestrianNotification", "Pedestrian notification.", 250, 400);
        stage.addNotification("carANotification", "carANotification.", 200, 460);


        break;
    case 1:
        stage = new SituationStage(this.situationStagesManager, this.game, this.roadObjectsFactory);

        stage.addStartingVelocity("carB", 0, -120);
        stage.addStartingVelocity("pedestrianA", -200, 0);

        stage.addCollisionHandler("triggerA", "carB",
            function () {
                this.getObject("carB").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);
                this.setFinished();
            }
        );

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }
    this.situationStagesManager.pushNewStage(stage);
}