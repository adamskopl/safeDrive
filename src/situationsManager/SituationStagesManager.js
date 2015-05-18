function SituationStagesManager(game, situation) {
    this.game = game;
    this.situation = situation;
    this.stages = [];
    this.stagesButtonsBad = [];
    this.stagesButtonsGood = [];
    this.currentStageNumber = 0;
    this.notificationsFactory = situation.notificationsFactory;
}

SituationStagesManager.prototype.getSituation = function () {
    return this.situation;
};

SituationStagesManager.prototype.pushNewStage = function (newStage, badStage) {
    newStage.number = this.stages.length;
    this.stages.push(newStage);

    var newButton = {};

    var x;
    if (badStage) {
        x = 40 * this.stages.length + 200;
    } else {
        x = 40 * (this.stages.length - 4) + 200;
    }
    var y = 440;

    var frameHover = 0;
    var frameNormal = 1;
    if (!badStage) {
        frameHover += 2;
        frameNormal += 2;
    }

    var stageButton = this.game.add.button(x, y, 'stageButtons',
        newStage.onStageButtonClick, newStage, frameHover, frameNormal);
    stageButton.scale.x = 0.5;
    stageButton.scale.y = 0.5;
    // uncomment to drag buttons
    //    stageButton.inputEnabled = true;
    //    stageButton.input.enableDrag();

    // button will be visible after the stage is finished
    stageButton.visible = false;

    var textContent;
    if (badStage) {
        textContent = newStage.number + 1;
    } else {
        textContent = newStage.number - 3;
    }
    var text = this.game.add.text(x + 10, y + 8, textContent, {
        font: "20px Arial",
        fill: '#FFF'
    });
    text.visible = false;

    newButton.button = stageButton;
    newButton.text = text;
    if (badStage) {
        this.stagesButtonsBad.push(newButton);
    } else {
        this.stagesButtonsGood.push(newButton);
    }
};

function onButtonStageClick() {
    console.log(this.number);
}

/**
 * Descdescdesc
 * @param   {Number} stageNumber stage's number
 * @returns {Object} SafeDrive.SituationStage
 */
SituationStagesManager.prototype.getStage = function (stageNumber) {
    return this.stages[stageNumber];
};

SituationStagesManager.prototype.getStageLast = function () {
    return this.stages[this.stages.length - 1];
}

SituationStagesManager.prototype.getCurrentStage = function () {
    return this.stages[this.currentStageNumber];
};

/**
 * Hide good or badd buttons
 * @param {Boolean} show       true/fasle if buttons should be shown/hidden
 * @param {Boolean} badButtons true/false if bad/good buttons should be hidden
 */
SituationStagesManager.prototype.setStageButtons = function (show, badButtons) {

    // at some stage buttons stopped working. anyway: they are confusing for the user
    return;

    var buttonsArray;
    if (badButtons) {
        buttonsArray = this.stagesButtonsBad;
    } else {
        buttonsArray = this.stagesButtonsGood;
    }
    for (key in buttonsArray) {
        var button = buttonsArray[key];
        button.button.visible = show;
        button.text.visible = show;
    }
}

/**
 * Stage has finished its work.
 * @param {Number} stageNumber Stage's id.
 */
SituationStagesManager.prototype.onStageFinished = function (stageNumber) {
    // at some stage buttons stopped working. anyway: they are confusing for the user
    /*
        var buttonPos;
        var buttonsArray;
        if (stageNumber < 4) {
            buttonsArray = this.stagesButtonsBad;
            buttonPos = stageNumber;
            this.setStageButtons(false, false);
        } else {
            buttonsArray = this.stagesButtonsGood;
            buttonPos = stageNumber - 4;
            this.setStageButtons(false, true);
        }
        var button = buttonsArray[buttonPos];
        button.button.visible = true;
        button.text.visible = true;
    */

    if (stageNumber !== (this.stages.length - 1)) {
        this.currentStageNumber++;
        this.situation.startStage(this.currentStageNumber);
    } else {
        this.currentStageNumber = 0;
        // hide all buttons
        // at some stage buttons stopped working. anyway: they are confusing for the user
        /*
                this.setStageButtons(false, false);
                this.setStageButtons(false, true);
        */
        this.situation.onSituationFinished();
    }
};