function SituationStagesManager(game, situation) {
    this.game = game;
    this.situation = situation;
    this.stages = [];
    this.stagesButtons = [];
    this.currentStageNumber = 0;

    this.spritesBodyMovementUnlockNeeded = false;
}

SituationStagesManager.prototype.pushNewStage = function (newStage) {
    newStage.number = this.stages.length;
    this.stages.push(newStage);

    var stageButton = this.game.add.button(40 * this.stages.length, 560, 'stageButtons',
        newStage.onStageButtonClick, newStage, 0, 1);
    stageButton.scale.x = 0.5;
    stageButton.scale.y = 0.5;
    stageButton.inputEnabled = true;
    stageButton.input.enableDrag();
    // button will be visible after the stage is finished
    stageButton.visible = false;
    this.stagesButtons.push(stageButton);
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

SituationStagesManager.prototype.getCurrentStage = function () {
    return this.stages[this.currentStageNumber];
};

/**
 * Stage has finished its work.
 * @param {Number} stageNumber Stage's id.
 */
SituationStagesManager.prototype.onStageFinished = function (stageNumber) {
    this.stagesButtons[stageNumber].visible = true;

    if (this.currentStageNumber !== this.stages.length - 1) {
        this.currentStageNumber++;
        this.situation.startStage(this.currentStageNumber);
    }

};