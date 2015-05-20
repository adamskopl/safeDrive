Situation04.prototype.initStage = function (stageNumber, stage) {

    var carASpeed = -300;
    var carBSpeed = -310;

    switch (stageNumber) {
    case 0:

        stage.addStartingNotificationPlay(sConstants.N04_01_INTRO);

        stage.notification().addNotification(
            sConstants.N04_01_INTRO, [
            "Dwóch kierowców jedzie w tym",
            "samym kierunku"
            ],
            undefined, undefined,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        break;
    case 1:

        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carASpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed, 0, -50);

        stage.addCollisionHandler(sConstants.T04_02_OVERTAKE_INTRO, sConstants.OBJECT_CAR_B,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N04_02_OVERTAKE_INTRO);
            });

        stage.notification().addNotification(
            sConstants.N04_02_OVERTAKE_INTRO, [
            "Jeden z nich wykonuje manewr",
            "wyprzedzania."
            ],
            undefined, undefined,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        break;
    case 2:

        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carASpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed, 0, -50);

        stage.addCollisionHandler(sConstants.T04_03_OVERTAKE_PEDESTRIAN, sConstants.OBJECT_CAR_B,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N04_03_OVERTAKE_PEDESTRIAN);
            });

        stage.notification().addNotification(
            sConstants.N04_03_OVERTAKE_PEDESTRIAN, [
            "Manewr zostaje dokonany na przejściu",
            "dla pieszych."
            ],
            undefined, undefined,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        break;
    case 3:
        stage.addStartingNotificationPlay(sConstants.N04_04_ILLEGAL);

        stage.notification().addNotification(
            sConstants.N04_04_ILLEGAL, [
            "Taki manewr to złamanie przepisów.",
            "Wyprzedzanie na przejściu dla pieszych,",
            "jest niedozwolone. Co ważniejsze:",
            "niebezpieczne."
            ],
            undefined, undefined,
            function () {
                stage.addEventVelocity(0, sConstants.OBJECT_CAR_A, 0, carASpeed);
                stage.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, carBSpeed, 0, -50);
            }, stage);

        stage.addCollisionHandler(sConstants.T04_04_BAD_END, sConstants.OBJECT_CAR_B,
            function () {
                this.notification().startNotification(
                    Situation04.prototype.instructionTexts.good.name);
            });

        break;
    case 4:
        stage.stageNumberFromWhichPositionsAreTaken = 0;
        this.initStage(0, stage);
        break;
    case 5:
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carASpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed + 20, 0, 50);

        stage.addCollisionHandler(sConstants.T04_02_OVERTAKE_INTRO, sConstants.OBJECT_CAR_B,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N04_05_OVERTAKE_INTRODUCTION);
            });

        stage.notification().addNotification(
            sConstants.N04_05_OVERTAKE_INTRODUCTION, [
            "Jeden z nich chce wykonać manewr",
            "wyprzedzania, jednak wstrzymuje",
            "się z nim, widząc przejście dla pieszych."
            ],
            undefined, undefined,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        break;
    case 6:
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carASpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed + 100, 0);

        stage.addCollisionHandler(sConstants.T04_03_OVERTAKE_PEDESTRIAN, sConstants.OBJECT_CAR_B,
            function () {
                this.addEvent(0, this.setFinished);
            });


        break;
    case 7:

        stage.addStartingNotificationPlay(sConstants.N04_07_FINISH);

        stage.notification().addNotification(
            sConstants.N04_07_FINISH, [
            "Kierowca może podjąć decyzję",
            "o wyprzedzaniu dopiero za przejściem.",
            "Oczywiście musi się upewnić, czy wykona",
            "ten manewr w bezpieczny sposób."
            ],
            undefined, undefined,
            function () {
                stage.addEventVelocity(0, sConstants.OBJECT_CAR_A, 0, carASpeed);
                stage.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, carBSpeed + 100, 0, -200);

                this.addEvent(1.5, this.setFinished);
            }, stage);

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }

}