function AttentionManager(game) {
    this.game = game;

    this.sprite = this.game.add.sprite(30, 30, 'attention');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.width = 75;
    this.sprite.height = 75;

    this.tweenFunction = Phaser.Easing.Linear.None;
    this.tweenSpeed = 500;

    this.tween = this.game.add.tween(this.sprite).to({
        width: 50
    }, this.tweenSpeed, this.tweenFunction, true, 0, -1, true);
    this.tween = this.game.add.tween(this.sprite).to({
        height: 50
    }, this.tweenSpeed, this.tweenFunction, true, 0, -1, true);

    this.sprite.visible = false;
}

AttentionManager.prototype.show = function (position) {
    this.sprite.position = position;
    this.sprite.visible = true;
};

AttentionManager.prototype.hide = function () {
    this.sprite.visible = false;
};