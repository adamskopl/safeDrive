Situation02.prototype.initStage = function (stageNumber, stage) {
    switch (stageNumber) {
    case 0:
        this.pedestrianASpeed = -30;

        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingVelocity("carA", 0, this.pedestrianASpeed);

        break;
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    case 4:
        break;
    case 5:
        break;
    case 6:
        break;
    case 7:
        break;
    default:
        console.log("initStage() unknown stageNumber");
    }

}