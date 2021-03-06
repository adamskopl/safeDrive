Situation04.prototype.initStage = function (stageNumber, stage) {

    var carASpeed = -300;
    var carBSpeed = -310;

    switch (stageNumber) {
    case 0:

        stage.addStartingNotificationPlay(sConstants.N04_01_INTRO);

        var notif01 = stage.notification().addNotification(
            sConstants.N04_01_INTRO, {
                pl: [
            "Dwóch kierowców jedzie w tym",
            "samym kierunku"
            ],
                en: []
            },
            1, 1,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);
        notif01.addPressMeNotification();

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
            sConstants.N04_02_OVERTAKE_INTRO, {
                pl: [
            "Jeden z nich wykonuje manewr",
            "wyprzedzania."
            ],
                en: []
            },
            1, 1,
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
            sConstants.N04_03_OVERTAKE_PEDESTRIAN, {
                pl: [
            "Manewr zostaje dokonany bezpośrednio",
            "przed przejściem dla pieszych,",
            "względnie na przejściu dla pieszych."
            ],
                en: []
            },
            1, 1,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        break;
    case 3:
        stage.addStartingNotificationPlay(sConstants.N04_04_ILLEGAL);

        stage.notification().addNotification(
            sConstants.N04_04_ILLEGAL, {
                pl: [
                    "Wyprzedzanie na przejściu",
                    "lub przed przejściem",
                    "dla pieszych jest niedozowolne."
            ],
                en: []
            },
            1, 1,
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
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed, 0, 0);

        stage.addCollisionHandler(sConstants.T04_02_OVERTAKE_INTRO, sConstants.OBJECT_CAR_B,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N04_05_OVERTAKE_INTRODUCTION);
            });

        stage.notification().addNotification(
            sConstants.N04_05_OVERTAKE_INTRODUCTION, {
                pl: [
            "Jeden z nich chce wykonać manewr",
            "wyprzedzania, jednak wstrzymuje",
            "się z nim, widząc przejście dla pieszych."
            ],
                en: []
            },
            1, 1,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        break;
    case 6:
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carASpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed + 40, 0);

        stage.addCollisionHandler(sConstants.T04_03_OVERTAKE_PEDESTRIAN, sConstants.OBJECT_CAR_B,
            function () {
                this.addEvent(0, this.setFinished);
            });


        break;
    case 7:

        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, carASpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B, 0, carBSpeed + 25, 0, 50);

        stage.addCollisionHandler(sConstants.T04_04_BAD_END, sConstants.OBJECT_CAR_B,
            function () {
                this.addEvent(1.5, this.setFinished);
            });


        break;
    default:
        console.log("initStage() unknown stageNumber");
    }

};
