    Situation01.prototype.initStage = function (stageNumber, stage) {
        var speedUp = 1;
        var pedestrianSpeed = -27 * speedUp;
        var carASpeed = -200 * speedUp;
        var carBSpeed = -450 * speedUp;

        var notificationDur = 4 / speedUp;

        switch (stageNumber) {
        case 0:
            stage.addStartingVelocity(sConstants.OBJECT_PEDESTRIAN, pedestrianSpeed, 0);

            stage.notification().addNotificationCallback(sConstants.NOTIF_S01_PEDESTRIAN, [
            "Pieszy zbliża się do przejścia."], function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
            }, stage);

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
            stage.notification().addNotificationCallback(sConstants.NOTIF_S02_CARA_START, [
            "Nadjeżdża samochód."], function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
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

            stage.notification().addNotificationCallback(sConstants.NOTIF_S02_CARA_BRAKE, [
            "Kierowca widząc pieszego,",
            "rozpoczyna hamowanie."], function () {
                this.notification().startNotification(sConstants.NOTIF_S02_PEDESTRIAN_CONTINUE);
            }, stage);

            stage.notification().addNotificationCallback(sConstants.NOTIF_S02_PEDESTRIAN_CONTINUE, [
            "Pieszy widząc,",
            "że kierowca ma zamiar się zatrzymać,",
            "przechodzi przez przejście."], function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
                this.addEventVelocity(0, sConstants.OBJECT_CAR_A,
                    0, carASpeed, 0, 70 * speedUp);
            }, stage);

            stage.addCollisionHandler(sConstants.TRIGGER_S02_CARA_STOP, sConstants.OBJECT_CAR_A,
                function () {
                    this.getObject(sConstants.OBJECT_CAR_A).setVelocity(0, 0);
                    this.addEvent(0, this.setFinished);
                });
            break;
        case 2:

            stage.notification().addNotificationCallback(sConstants.NOTIF_S03_CARB_START, [
            "Tymczasem nadjeżdża drugi kierowca,",
            "który nie zwalnia przed przejściem."], function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN,
                    pedestrianSpeed, 0);
                this.addEventVelocity(0, sConstants.OBJECT_CAR_B,
                    0, carBSpeed);
            }, stage);

            stage.notification().addNotificationCallback(sConstants.NOTIF_S03_CARB_BRAKE, [
            "Kierowca widząc pieszego,",
            "nie ma już czasu na hamowanie."], function () {
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
                0, carBSpeed, 0, 600);


            stage.notification().addNotificationCallback(sConstants.NOTIF_S04_COLLISION, [
                    "Dochodzi do potrącania."], function () {
                this.notification().startNotification(Situation01.prototype.instructionTexts.good.name);
            }, stage);

            stage.addCollisionHandler(sConstants.OBJECT_CAR_B, sConstants.OBJECT_PEDESTRIAN,
                function () {
                    this.getObject(sConstants.OBJECT_CAR_B).setVelocity(0, 0);
                    this.notification().startNotification(sConstants.NOTIF_S04_COLLISION);
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

            stage.notification().addNotificationCallback(sConstants.NOTIF_S07_PEDESTRIAN_CHECK, [
                "Pieszy wie, że z drugiego pasa może",
                "wyjechać łamiący przepisy kierowca,",
                "dlatego zapobiegliwie sprawdza,",
                "czy może iść dalej."],
                function () {
                    this.addEventVelocity(0, sConstants.OBJECT_CAR_B, 0, carBSpeed);
                }, stage);

            stage.addCollisionHandler(sConstants.TRIGGER_S07_PEDESTRIAN_CHECK, sConstants.OBJECT_PEDESTRIAN,
                function () {
                    this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN, 0, 0);
                    this.notification().startNotification(sConstants.NOTIF_S07_PEDESTRIAN_CHECK);
                });

            stage.notification().addNotificationCallback(sConstants.NOTIF_S07_CARB_BRAKE, [
                "Drugi kierowca, widząc samochód",
                "na drugim pasie, również",
                "zatrzymuje się przed przejściem"],
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
            stage.notification().addNotificationCallback(sConstants.NOTIF_S08_PEDESTRIAN_CONTINUE, [
            "Pieszy widząc, że jest bezpieczny,",
            "kontynuuje przejście."], function () {
                this.addEventVelocity(0, sConstants.OBJECT_PEDESTRIAN, pedestrianSpeed, 0);
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
    }