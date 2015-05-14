var NOTIFICATION_CAR_A = "carANotification";

Situation01.prototype.initStage = function (stageNumber, stage) {
    var speedUp = 2.5;

    switch (stageNumber) {
    case 0:
        this.pedestrianASpeed = -30 * speedUp;
        stage.addStartingVelocity("carA", 0, -100 * speedUp);
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');

        stage.notification().addNotification("pedestrianNotification", ["Pieszy zbliża się do przejścia."]);
        stage.notification().addNotification(NOTIFICATION_CAR_A, ["Kierowca widząc pieszego,", "rozpoczyna hamowanie."]);

        stage.addCollisionHandler("triggerA", "carA",
            function () {
                this.getObject("carA").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);
                this.notification().startNotification("pedestrianNotification", 0 / speedUp, 4 / speedUp);
                this.notification().startNotification(NOTIFICATION_CAR_A, 4 / speedUp, 4 / speedUp);
                this.getObject("pedestrianA").sprite.animations.stop();
                this.addEvent(8 / speedUp, this.setFinished);
            }
        );

        break;
    case 1:
        stage.addStartingVelocity("carA", 0, -100 * speedUp, 0, 50 * speedUp);
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');

        stage.addCollisionHandler("triggerA", "carB",
            function () {
                this.getObject("carB").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);
            }
        );

        stage.addCollisionHandler("triggerB", "carA",
            function () {
                this.getObject("carA").setVelocity(0, 0, 0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);
                this.setFinished();
            }
        );

        break;
    case 2:

        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');
        stage.addStartingVelocity("carB", 0, -350 * speedUp);
        stage.notification().addNotification("carBNotification", ["Tymczasem nadjeżdża drugi kierowca,", "który nie zwalnia przed przejściem."]);

        stage.addCollisionHandler("tCarBIntroInfo", "carB",
            function () {
                this.getObject("carB").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);
                this.getObject("pedestrianA").sprite.animations.stop();
                this.notification().startNotification("carBNotification", 0 / speedUp, 4 / speedUp);
                this.addEvent(4 / speedUp, this.setFinished);
            }
        );
        break;

    case 3:
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');
        stage.addStartingVelocity("carB", 0, -350 * speedUp, 0, 400);
        stage.addCollisionHandler("triggerC", "carB",
            function () {
                this.getObject("pedestrianA").setVelocity(0, 0, 0, 0);
                this.getObject("pedestrianA").sprite.animations.play('front');
            }
        );

        stage.notification().addNotification(
            this.instructionTexts.good.name, this.instructionTexts.good.text, 250, 300);

        stage.notification().getNotification(this.instructionTexts.good.name).addConfirmButton(
            function () {
                console.log("define me!");
            }, this);

        stage.addCollisionHandler("carB", "pedestrianA",
            function () {
                this.getObject("carB").setVelocity(0, 0, 0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0, 0, 0);

                this.notification().startNotification(this.notificationsFactory.instructionTexts.good.name, 0, 1);

                this.setFinished();
            }
        );

        break;

    case 4:
        ////////////////// STARTING GOOD VARIANT ///////////////////
        stage.stageNumberFromWhichPositionsAreTaken = 0;
        stage.addStartingVelocity("carA", 0, -100 * speedUp);
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');

        stage.addCollisionHandler("triggerA", "carA",
            function () {
                this.getObject("carA").setVelocity(0, 0);
                this.addEvent(0, this.setFinished);
            }
        );

        break;
    case 5:
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addCollisionHandler("testTriggerFinishA", "pedestrianA",
            function () {
                this.addEvent(0, this.setFinished);
            }
        );
        break;
    case 6:
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addCollisionHandler("testTriggerFinishB", "pedestrianA",
            function () {
                this.addEvent(0, this.setFinished);
            }
        );
        break;
    case 7:
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addCollisionHandler("testTriggerFinishC", "pedestrianA",
            function () {
                this.addEvent(0, this.setFinished);
            }
        );
        break;
    default:
        console.log("initStage() unknown stageNumber");
    }
}