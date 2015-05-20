Situation02.prototype.initStage = function (stageNumber, stage) {

    var bikeSpeed = 300;
    var carSpeed = 300;

    this.init01 = function (stageBikeSpeed) {
        stage.addStartingVelocity(sConstants.OBJECT_BIKE, 0, stageBikeSpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carSpeed);

        stage.notification().addNotification(
            sConstants.N02_02_BIKE_INTRO, [
            "Tymczasem ścieżką rowerową jedzie",
            "rozpędzony rowerzysta. Zbliża",
            "się do odcinka ścieżki, przebiegającej",
            "przez ulicę."
            ],
            undefined, undefined,
            function () {
                this.addEvent(0, this.setFinished);

            }, stage);

        stage.addCollisionHandler(sConstants.T02_02_CAR_TURN, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_BIKE).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N02_02_BIKE_INTRO);
            });
    };

    switch (stageNumber) {
    case 0:

        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carSpeed);

        stage.notification().addNotification(
            sConstants.N02_01_CAR_TURN, [
            "Kierowca zbliża się do skrzyżowania",
            "z zamiarem skrętu w prawo."
            ],
            undefined, undefined,
            function () {
                this.addEvent(0, this.setFinished);

            }, stage);

        stage.addCollisionHandler(sConstants.T02_01_CAR_INTRO, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N02_01_CAR_TURN);
            });

        break;
    case 1:
        this.init01(bikeSpeed);

        break;
    case 2:

        stage.addStartingNotificationPlay(sConstants.N02_03_CAR_A_CONTIMUE);

        stage.notification().addNotification(
            sConstants.N02_03_CAR_A_CONTIMUE, [
            "Kierowca nie zachowując ostrożności,",
            "kontynuuje manewr skrętu w prawo."
            ],
            undefined, undefined,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_BIKE, 0, bikeSpeed);
                this.addEventStartTurn(0, sConstants.OBJECT_CAR_A, sConstants.OBJECT_ROTATION_P, 180, 600, function () {
                    this.setFinished();
                }, stage);
            }, stage);

        break;
    case 3:

        stage.addStartingVelocity(sConstants.OBJECT_BIKE, 0, bikeSpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, -carSpeed, 0);

        stage.addCollisionHandler(sConstants.OBJECT_CAR_A, sConstants.OBJECT_BIKE,
            function () {
                this.getObject(sConstants.OBJECT_BIKE).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N02_04_COLLISION);
            });

        stage.notification().addNotification(
            sConstants.N02_04_COLLISION, [
            "Dochodzi do kolizji."
            ],
            undefined, undefined,
            function () {
                this.notification().startNotification(Situation02.prototype.instructionTexts.good.name);
            }, stage);

        break;
        // -------------------------------------------------
    case 4:
        stage.stageNumberFromWhichPositionsAreTaken = 0;
        this.initStage(0, stage);
        break;
    case 5:
        this.init01(0);
        break;
    case 6:
        stage.addStartingNotificationPlay(sConstants.N02_06_CAR_A_CONTINUE);

        stage.notification().addNotification(
            sConstants.N02_06_CAR_A_CONTINUE, [
            "Kierowca widzac ścieżkę rowerową,",
            "zachowuje ostrożność i wykonuje manewr",
            "skrętu z odpowiednią prędkością."
            ],
            undefined, undefined,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_BIKE, 0, bikeSpeed / 2);
                this.addEventStartTurn(0, sConstants.OBJECT_CAR_A, sConstants.OBJECT_ROTATION_P,
                    180, 2000,
                    function () {
                        this.setFinished();
                    }, stage);
            }, stage);

        break;
    case 7:
        stage.addStartingNotificationPlay(sConstants.N02_07_WAIT);

        stage.notification().addNotification(
            sConstants.N02_07_WAIT, [
            "Kierowca nie spiesząc się, zauważa",
            "w porę rowerzystę i czeka, aż ten",
            "przejedzie dalej."
            ],
            undefined, undefined,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_BIKE, 0, bikeSpeed);
                this.addEventVelocity(1.2, sConstants.OBJECT_CAR_A, -carSpeed / 8, 0, -500, 0);
                this.addEvent(3, this.setFinished);
            }, stage);

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }

}