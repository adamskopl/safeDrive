Situation03.prototype.initStage = function (stageNumber, stage) {

    var bikeSpeed = 250;
    var carSpeed = 200;

    switch (stageNumber) {
    case 0:
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, -carSpeed);

        stage.notification().addNotification(
            sConstants.N03_01_CAR_INTRO, [
            "Kierowca zbliża się do skrzyżowania",
            "z zamiarem skrętu w prawo."
            ],
            1, 1,
            function () {
                this.addEvent(0, this.setFinished);
                this.getObject(sConstants.OBJECT_BIKE).sprite.animations.play('ride');
            }, stage);

        stage.addCollisionHandler(sConstants.T03_01_CAR_INTRO, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N03_01_CAR_INTRO);
            });

        break;
    case 1:

        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, -carSpeed);
        stage.addStartingVelocity(sConstants.OBJECT_BIKE, 0, -bikeSpeed);

        stage.notification().addNotification(
            sConstants.N03_02_BIKE_INTRO, [
            "Tymczasem ścieżką rowerową",
            "nadjeżdża rozpędzony rowerzysta."
            ],
            1, 1,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        stage.addCollisionHandler(sConstants.T03_02_CAR_TURN, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_BIKE).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N03_02_BIKE_INTRO);
            });
        break;
    case 2:

        stage.addStartingNotificationPlay(sConstants.N03_02_CAR_CONTINUE);

        stage.notification().addNotification(
            sConstants.N03_02_CAR_CONTINUE, [
            "Nie widząc pieszych na przejściu,",
            "kierowca wykonuje manewr skrętu w",
            "prawo."
            ],
            1, 1,
            function () {
                this.notification().startNotification(
                    sConstants.N03_03_BIKE_CONTINUE);
            }, stage);

        stage.notification().addNotification(
            sConstants.N03_03_BIKE_CONTINUE, [
            "Rowerzysta, błędnie traktując przejście",
            "dla pieszych, jak przedłużenie ścieżki",
            "rowerowej, kontynuuje przejazd."
            ],
            1, 1,
            function () {
                stage.addEventVelocity(0, sConstants.OBJECT_BIKE, 0, -bikeSpeed);
                stage.addEventStartTurn(0, sConstants.OBJECT_CAR_A,
                    sConstants.OBJECT_ROTATION_P, 0, 800,
                    function () {
                        this.setFinished()
                            //this.getObject(sConstants.OBJECT_CAR_A).setVelocity(carSpeed, 0);
                    }, stage);
            }, stage);

        break;
    case 3:
        stage.addStartingVelocity(sConstants.OBJECT_BIKE, 0, -bikeSpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, carSpeed, 0, -100, 0);

        stage.addCollisionHandler(sConstants.OBJECT_CAR_A, sConstants.OBJECT_BIKE,
            function () {
                this.getObject(sConstants.OBJECT_BIKE).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N03_04_COLLISION);
            });

        stage.notification().addNotification(
            sConstants.N03_04_COLLISION, [
            "Kierowca spodziewając się pieszych,",
            "nie ma czasu na wyhamowanie przed",
            "rozpędzonym rowerem.",
            "Dochodzi do kolizji."
            ],
            1, 1,
            function () {
                this.notification().startNotification(Situation03.prototype.instructionTexts.good.name);
            }, stage);

        break;
    case 4:
        stage.stageNumberFromWhichPositionsAreTaken = 0;
        this.initStage(0, stage);
        break;
    case 5:
        this.initStage(1, stage);
        break;
    case 6:
        stage.addStartingNotificationPlay(sConstants.N03_06_BIKE_SLOW);

        stage.notification().addNotification(
            sConstants.N03_06_BIKE_SLOW, [
            "Widząc przejście,",
            "rowerzysta zwalnia."
            ],
            1, 1,
            function () {
                this.notification().startNotification(
                    sConstants.N03_06_CAR_SLOW);
            }, stage);

        stage.notification().addNotification(
            sConstants.N03_06_CAR_SLOW, [
            "Kierowca również zmniejsza",
            "prędkość, widząc, że przetnie",
            "przejście dla pieszych."
            ],
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_BIKE, 0, -bikeSpeed, 0, 80);
                this.addEventStartTurn(0, sConstants.OBJECT_CAR_A, sConstants.OBJECT_ROTATION_P,
                    0, 2000,
                    function () {}, stage);

            }, stage);

        stage.notification().addNotification(
            sConstants.N03_06_BIKE_WALK, [
            "Rowerzysta, aby przejśc przez przejście,",
            "zsiada z roweru. Kierowca widzi wyraźnie,",
            "że rowerzysta będzie przeprowadzał rower."
            ],
            1, 1,
            function () {
                this.setFinished();
            }, stage);

        stage.addCollisionHandler(sConstants.T03_06_BIKE_STOP, sConstants.OBJECT_BIKE,
            function () {
                this.getObject(sConstants.OBJECT_BIKE).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_BIKE).sprite.animations.play('walk');
                this.notification().startNotification(
                    sConstants.N03_06_BIKE_WALK);
            });

        break;
    case 7:
        stage.addStartingVelocity(sConstants.OBJECT_BIKE, 0, -bikeSpeed / 3);

        stage.addCollisionHandler(sConstants.T03_08_CAR_CONTINUE, sConstants.OBJECT_BIKE,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_CAR_A, carSpeed / 8, 0, 300, 0);
                this.addEvent(1.5, this.setFinished);
            });

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }


}