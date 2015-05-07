Situation01.prototype.initStage = function (stageNumber) {
    var stage = new SituationStage(this.situationStagesManager, this.game, this.roadObjectsFactory);
    switch (stageNumber) {
    case 0:
        this.pedestrianASpeed = -27;
        stage.addStartingVelocity("carA", 0, -100);
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');

        stage.notification().addNotification("pedestrianNotification", ["Pieszy zbliża się do przejścia."], this.roadObjectsFactory.get("pedestrianA"));
        stage.notification().addNotification("carANotification", ["Kierowca widząc pieszego,", "rozpoczyna hamowanie."], this.roadObjectsFactory.get("carA"));

        stage.addCollisionHandler("triggerA", "carA",
            function () {
                this.getObject("carA").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);

                this.notification().startNotification("pedestrianNotification", 0, 4);
                this.notification().startNotification("carANotification", 5, 4);
                this.getObject("pedestrianA").sprite.animations.stop();
                this.addEvent(9, this.setFinished, this);
            }
        );

        break;
    case 1:
        stage.addStartingVelocity("carA", 0, -100, 0, 50);
        //        stage.addStartingVelocity("carB", 0, -120);
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
        stage.addStartingVelocity("carB", 0, -350);
        stage.notification().addNotification("carBNotification", ["Tymczasem nadjeżdża drugi kierowca,", "który nie zwalnia przed przejściem."], this.roadObjectsFactory.get("carB"));

        stage.addCollisionHandler("tCarBIntroInfo", "carB",
            function () {
                this.getObject("carB").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);
                this.getObject("pedestrianA").sprite.animations.stop();
                this.notification().startNotification("carBNotification", 0, 4);
                this.addEvent(4, this.setFinished, this);
            }
        );
        break;

    case 3:
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');
        stage.addStartingVelocity("carB", 0, -350, 0, 400);
        stage.addCollisionHandler("triggerC", "carB",
            function () {
                this.getObject("pedestrianA").setVelocity(0, 0, 0, 0);
                this.getObject("pedestrianA").sprite.animations.play('front');
            }
        );

        stage.notification().addNotification(
            s01InstructionTexts.good.name, s01InstructionTexts.good.text, null, 250, 300);

        stage.notification().getNotification(s01InstructionTexts.good.name).addConfirmButton(
            function () {
                console.log("define me!");
            }, this);

        stage.addCollisionHandler("carB", "pedestrianA",
            function () {
                this.getObject("carB").setVelocity(0, 0, 0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0, 0, 0);

                this.notification().startNotification(s01InstructionTexts.good.name, 0);

                this.setFinished();
            }
        );

        break;

    case 4:

        ////////////////// STARTING GOOD VARIANT ///////////////////
        stage.stageNumberFromWhichPositionsAreTaken = 0;
        stage.addStartingVelocity("carA", 0, -100);
        stage.addStartingVelocity("pedestrianA", this.pedestrianASpeed, 0);
        stage.addStartingAnimation("pedestrianA", 'left');

        stage.addCollisionHandler("triggerA", "carA",
            function () {
                this.getObject("carA").setVelocity(0, 0);
                this.getObject("pedestrianA").setVelocity(0, 0);

                this.getObject("pedestrianA").sprite.animations.stop();
                this.addEvent(0, this.setFinished, this);
            }
        );

        break;
    default:
        console.log("initStage() unknown stageNumber");
    }
    this.situationStagesManager.pushNewStage(stage);
}