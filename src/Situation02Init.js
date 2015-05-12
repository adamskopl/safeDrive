Situation02.prototype.initStage = function (stageNumber, stage) {
    switch (stageNumber) {
    case 0:
        this.pedestrianASpeed = -30;

        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }

}