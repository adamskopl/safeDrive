Situation05.prototype.initStage = function (stageNumber, stage) {

    var busSpeed = 150;
    var pedestrianSpeed = 50;
    var carSpeed = 300;
    var pedestrianArray = [
        sConstants.OBJECT_PEDESTRIAN,
        sConstants.OBJECT_PEDESTRIAN_2,
        sConstants.OBJECT_PEDESTRIAN_3
    ];

    function setSpeedPedestrians(velX, velY, accelX, accelY) {
        for (i = 0; i < pedestrianArray.length; i++) {
            stage.getObject(pedestrianArray[i]).setVelocity(velX, velY, accelX, accelY);
        }
    }

    switch (stageNumber) {
    case 0:
        stage.addStartingVelocity(sConstants.OBJECT_BUS, 0, busSpeed);
        stage.addStartingVelocity(pedestrianArray, 0, busSpeed);

        stage.addCollisionHandler(sConstants.T05_01_BUS_SLOW, sConstants.OBJECT_BUS,
            function () {
                this.getObject(sConstants.OBJECT_BUS).setVelocity(0, busSpeed, 0, -48);
                setSpeedPedestrians(0, busSpeed, 0, -48);
            });
        stage.addCollisionHandler(sConstants.T05_01_BUS_STOP, sConstants.OBJECT_BUS,
            function () {
                this.getObject(sConstants.OBJECT_BUS).setVelocity(0, 0);
                setSpeedPedestrians(0, 0);
                this.setFinished();
            });

        break;
    case 1:
        stage.addStartingNotificationPlay(sConstants.N05_02_BUS_OUT);

        stage.notification().addNotification(
            sConstants.N05_02_BUS_OUT, {
                pl: [
            "Pasażerowie opuszczają",
            "autobus."
            ],
                en: []
            },
            1, 1,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(-pedestrianSpeed, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(-pedestrianSpeed, 0);
            }, stage);


        stage.addCollisionHandler(sConstants.T05_02_PED_TURN, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(0, pedestrianSpeed);
                this.getObject(sConstants.OBJECT_PEDESTRIAN).sprite.angle = -90;
            });
        stage.addCollisionHandler(sConstants.T05_02_PED_TURN, sConstants.OBJECT_PEDESTRIAN_2,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, -pedestrianSpeed);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).sprite.angle = 90;
            });
        stage.addCollisionHandler(sConstants.T05_02_PED_TURN, sConstants.OBJECT_PEDESTRIAN_3,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(0, -pedestrianSpeed);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).sprite.angle = 90;
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(-pedestrianSpeed, 0);
            });

        stage.addCollisionHandler(sConstants.T05_02_PED_TURN_BUS, sConstants.OBJECT_PEDESTRIAN_3,
            function () {
                this.setFinished();
            });

        break;
    case 2:
        stage.addStartingNotificationPlay(sConstants.N05_03_PED_TURN);

        stage.notification().addNotification(
            sConstants.N05_03_PED_TURN, {
                pl: [
            "Jednemu z nich wyjątkowo się",
            "spieszy i chcąc przejść na drugą",
            "stronę ulicy, postanawia pójść",
            "najkrótszą, niekoniecznie bezpieczną",
            "drogą."
            ],
                en: []
            },
            1, 1,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).sprite.angle = 180;
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(pedestrianSpeed, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, -pedestrianSpeed);
            }, stage);

        stage.addCollisionHandler(sConstants.T05_03_PED_CONTINUE, sConstants.OBJECT_PEDESTRIAN_3,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N05_03_PED_CONTINUE);
            });

        stage.notification().addNotification(
            sConstants.N05_03_PED_CONTINUE, {
                pl: [
            "Być może zamyślony, nie bierze pod",
            "uwagę, że zza autobusu może",
            "coś wyjechać..."
            ],
                en: []
            },
            1, 1,
            function () {
                this.setFinished();
            }, stage);

        break;
    case 3:
        stage.addStartingVelocity(sConstants.OBJECT_BUS, 0, busSpeed / 15, 0, 50);
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN_3, pedestrianSpeed, 0);
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN_2, 0, -pedestrianSpeed);
        stage.addStartingVelocity(sConstants.OBJECT_CAR_A, 0, -carSpeed);

        stage.addCollisionHandler(sConstants.OBJECT_PEDESTRIAN_3, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).sprite.angle = 200;
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().attentionShow(
                    this.getObject(sConstants.OBJECT_PEDESTRIAN_3).sprite.position);
                this.notification().startNotification(
                    sConstants.N05_04_COLLISION);

                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).sprite.angle = 180;
            });

        stage.notification().addNotification(
            sConstants.N05_04_COLLISION, {
                pl: [
            "Przez nierozwagę dochodzi do",
            "wypadku.",
            ],
                en: []
            },
            1, 1,
            function () {
                this.notification().startNotification(Situation05.prototype.instructionTexts.good.name);
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
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN_3, 0, -pedestrianSpeed);
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN_2, 0, -pedestrianSpeed);

        stage.addCollisionHandler(sConstants.T05_02_PED_TURN_BUS, sConstants.OBJECT_PEDESTRIAN_2,
            function () {
                this.getObject(sConstants.OBJECT_BUS).setVelocity(0, busSpeed / 15, 0, 50);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, -carSpeed / 2);
            });

        stage.addCollisionHandler(sConstants.T05_02_PED_TURN_BUS, sConstants.OBJECT_PEDESTRIAN_3,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.N05_07_PEDESTRIAN_PROPER);
            });

        stage.notification().addNotification(
            sConstants.N05_07_PEDESTRIAN_PROPER, {
                pl: [
            "Pieszy, chcąc dostać się na drugą",
            "stronę, korzysta z przejścia.",
            ],
                en: []
            },
            1, 1,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(0, -pedestrianSpeed);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, -pedestrianSpeed);
            }, stage);

        stage.addCollisionHandler(sConstants.T05_07_PED_CONTINUE_PROPER, sConstants.OBJECT_PEDESTRIAN_3,
            function () {
                this.addEvent(0, this.setFinished);
            });

        break;
    case 7:
        stage.addStartingNotificationPlay(sConstants.N05_08_FINISH);

        stage.addCollisionHandler(sConstants.T05_08_CAR_STOP, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
            });

        stage.notification().addNotification(
            sConstants.N05_08_FINISH, {
                pl: [
            "Kierowca przepuszcza pieszego.",
            ],
                en: []
            },
            1, 1,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(pedestrianSpeed, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).sprite.angle = 180;
                this.getObject(sConstants.OBJECT_PEDESTRIAN_2).setVelocity(0, -pedestrianSpeed);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, -carSpeed / 2, 0, 75);
                this.getObject(sConstants.OBJECT_BUS).setVelocity(0, busSpeed);
            }, stage);

        stage.addCollisionHandler(sConstants.T05_08_CAR_CONTINUE, sConstants.OBJECT_PEDESTRIAN_3,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).setVelocity(0, -pedestrianSpeed);
                this.getObject(sConstants.OBJECT_PEDESTRIAN_3).sprite.angle = 90;
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, -carSpeed / 10, 0, -100);
                this.addEvent(4, this.setFinished);
            });

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }

}