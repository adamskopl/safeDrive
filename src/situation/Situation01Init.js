Situation01.prototype.initStage = function (stageNumber, stage) {
    var speedUp = 1;
    var pedestrianSpeed = -27 * speedUp;
    var carASpeed = -200 * speedUp;
    var carBSpeed = -450 * speedUp;
    var notificationDur = 4 / speedUp;
    switch (stageNumber) {
    case 0:
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN, pedestrianSpeed, 0);
        var notif01 = stage.notification().addNotification(
            sConstants.NOTIF_S01_PEDESTRIAN, {
                pl: [
                "Pieszy zbliża się",
                "do przejścia."
                ],
                en: []
            },
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
            },
            stage);
        notif01.addPressMeNotification();

        stage.addCollisionHandler(sConstants.TRIGGER_S01_PEDESTRIAN, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(0, 0);
                this.notification().startNotification(
                    sConstants.NOTIF_S01_PEDESTRIAN);
            }
        );
        stage.addCollisionHandler(sConstants.TRIGGER_S01_END, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(0, 0);
                this.addEvent(0, this.setFinished);
            }
        );
        break;
    case 1:
        stage.notification().addNotification(
            sConstants.NOTIF_S02_CARA_START, {
                pl: [
                "Nadjeżdża samochód."],
                en: []
            },
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    0, 0);
                this.addEventVelocity(0, sConstants.OBJECT_CAR_A,
                    0, carASpeed);
            }, stage);

        stage.addStartingNotificationPlay(sConstants.NOTIF_S02_CARA_START);

        stage.addCollisionHandler(sConstants.TRIGGER_S02_CARA_BRAKE, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);

                this.notification().startNotification(sConstants.NOTIF_S02_CARA_BRAKE);
            }
        );

        stage.notification().addNotification(
            sConstants.NOTIF_S02_CARA_BRAKE, {
                pl: [
                "Kierowca widząc pieszego,",
                "rozpoczyna hamowanie."],
                en: []
            },
            1, 1,
            function () {
                this.notification().startNotification(sConstants.NOTIF_S02_PEDESTRIAN_CONTINUE);
            }, stage);

        stage.notification().addNotification(
            sConstants.NOTIF_S02_PEDESTRIAN_CONTINUE, {
                pl: [
                "Pieszy widząc,",
                "że kierowca ma zamiar się zatrzymać,",
                "przechodzi przez przejście."],
                en: []
            },
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
                this.addEventVelocity(0, sConstants.OBJECT_CAR_A,
                    0, carASpeed * 0.75, 0, 40 * speedUp);
            }, stage);

        stage.addCollisionHandler(sConstants.TRIGGER_S02_CARA_STOP, sConstants.OBJECT_CAR_A,
            function () {
                this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                this.addEvent(0, this.setFinished);
            });
        break;
    case 2:

        stage.notification().addNotification(
            sConstants.NOTIF_S03_CARB_START, {
                pl: [
                "Tymczasem nadjeżdża drugi kierowca,",
                "który nie zwalnia przed przejściem."],
                en: []
            },
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B,
                    0, carBSpeed);
            }, stage);

        stage.notification().addNotification(
            sConstants.NOTIF_S03_CARB_BRAKE, {
                pl: [
                "Kierowca widząc pieszego,",
                "nie ma już czasu na hamowanie."],
                en: []
            },
            1, 1,
            function () {
                this.addEvent(0, this.setFinished);
            }, stage);

        stage.addStartingNotificationPlay(sConstants.NOTIF_S03_CARB_START);

        stage.addCollisionHandler(sConstants.TRIGGER_S03_CARB_BRAKE, sConstants.OBJECT_CAR_B,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                this.notification().startNotification(sConstants.NOTIF_S03_CARB_BRAKE);
            });

        stage.addCollisionHandler(sConstants.OBJECT_CAR_B, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    0, 0);
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B,
                    0, 0);
            });

        break;

    case 3:
        stage.addStartingVelocity(sConstants.OBJECT_CAR_B,
            0, carBSpeed * 0.75, 0, 300);
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN, pedestrianSpeed, 0);


        stage.notification().addNotification(
            sConstants.NOTIF_S04_COLLISION, {
                pl: [
                "Dochodzi do potrącania."],
                en: []
            },
            1, 1,
            function () {
                this.notification().startNotification(Situation01.prototype.instructionTexts.good.name);
            }, stage);

        stage.addCollisionHandler(sConstants.OBJECT_CAR_B, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                this.getObject(sConstants.OBJECT_PEDESTRIAN).setVelocity(0, 0);
                this.notification().startNotification(sConstants.NOTIF_S04_COLLISION);
                this.notification().attentionShow(
                    this.getObject(sConstants.OBJECT_PEDESTRIAN).sprite.position);
            });

        break;

    case 4:
        stage.stageNumberFromWhichPositionsAreTaken = 0;
        this.initStage(0, stage);
        break;
    case 5:
        this.initStage(1, stage);
        break;
    case 6:
        stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN, pedestrianSpeed, 0);

        stage.notification().addNotification(
            sConstants.NOTIF_S07_PEDESTRIAN_CHECK, {
                pl: [
                "Pieszy wie, że z drugiego pasa może",
                "wyjechać łamiący przepisy kierowca,",
                "dlatego zapobiegliwie sprawdza,",
                "czy może iść dalej."],
                en: []
            },
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, carBSpeed);
                this.getObject(sConstants.OBJECT_PEDESTRIAN).sprite.angle = -45;
            }, stage);

        stage.addCollisionHandler(sConstants.TRIGGER_S07_PEDESTRIAN_CHECK, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN, 0, 0);
                this.notification().startNotification(sConstants.NOTIF_S07_PEDESTRIAN_CHECK);
            });

        stage.notification().addNotification(
            sConstants.NOTIF_S07_CARB_BRAKE, {
                pl: [
                "Zbliżający się kierowca, widząc samochod,",
                "który zatrzymał się przed przejściem,",
                "również zatrzymuje się przed przejściem",
                "dla pieszych."],
                en: []
            },
            1, 1,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, carASpeed, 0, 70);
            }, stage);

        stage.addCollisionHandler(sConstants.TRIGGER_S07_CARB_BRAKE, sConstants.OBJECT_CAR_B,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, 0);
                this.notification().startNotification(sConstants.NOTIF_S07_CARB_BRAKE);
            });

        stage.addCollisionHandler(sConstants.TRIGGER_S07_CARB_STOP, sConstants.OBJECT_CAR_B,
            function () {
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, 0);
                this.addEvent(0, this.setFinished);
            });

        break;
    case 7:
        stage.notification().addNotification(
            sConstants.NOTIF_S08_PEDESTRIAN_CONTINUE, {
                pl: [
                "Pieszy widząc, że jest bezpieczny,",
                "kontynuuje przejście."],
                en: []
            },
            1, 1,
            function () {
                this.getObject(sConstants.OBJECT_PEDESTRIAN).sprite.angle = 0;
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN, pedestrianSpeed, 0);
                this.addEventVelocity(4, sConstants.OBJECT_CAR_A, 0, carASpeed * 0.3, 0, -100);
                this.addEventVelocity(4, sConstants.OBJECT_CAR_B, 0, carASpeed * 0.3, 0, -200);
            }, stage);

        stage.addStartingNotificationPlay(sConstants.NOTIF_S08_PEDESTRIAN_CONTINUE);

        stage.addCollisionHandler(sConstants.TRIGGER_S08_PEDESTRIAN_FINISH, sConstants.OBJECT_PEDESTRIAN,
            function () {
                this.addEvent(0, this.setFinished);
            });

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }
};