Situation01.prototype.initStages = function () {
    this.situationStagesManager = new SituationStagesManager();

    this.pedestrianASpeed = -30;

    var stage = new SituationStage(this.game, this.roadObjectsFactory);

    stage.addVelocity("carA", 0, -80);
    stage.addVelocity("pedestrianA", this.pedestrianASpeed, 0);

    stage.addCollisionHandler("triggerA", "carA",
        function () {
            this.getObject("carA").sprite.body.velocity.y = 0;
            this.getObject("pedestrianA").sprite.body.velocity.x = 0;
            this.getNotification("pedestrianNotification").textObject.visible = true;
            this.getNotification("carANotification").textObject.visible = true;
        }
    );

    stage.addNotification("pedestrianNotification", "Test notification.", 250, 400);
    stage.addNotification("carANotification", "Test notification.", 200, 460);

    this.situationStagesManager.pushNewStage(stage);
    this.situationStagesManager.getStage(0).start();
}