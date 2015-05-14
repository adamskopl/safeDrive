BackgroundManipulator = function (game) {
    this.game = game;
    this.background = this.game.add.sprite(0, 0, 'scenebig');

    // background consists of 9 tiles (sectors)
    this.sectorsNumber = 3;
    this.sectorW = this.background.width / this.sectorsNumber;
    this.sectorH = this.background.height / this.sectorsNumber;

    this.zoomFunction = Phaser.Easing.Cubic.Out;
    this.zoomSpeed = 1000;

    this.resetBackground();
}

BackgroundManipulator.prototype.resetBackground = function () {
    var back = this.background;
    back.x = 0;
    back.y = 0;
    back.width = this.sectorW;
    back.height = this.sectorH;
};

BackgroundManipulator.prototype.addZoomTween = function (tweenObject) {
    this.game.add.tween(this.background).to(tweenObject,
        this.zoomSpeed, this.zoomFunction, true, 0, false);
};

/**
 * Zoom to sector with given coordinates
 * @param {Number} sectorX sector's X (e.g 0, 3)
 * @param {Number} sectorY sector's Y
 */
BackgroundManipulator.prototype.zoomToSector = function (sectorX, sectorY) {
    this.addZoomTween({
        width: this.sectorW * this.sectorsNumber
    });

    this.addZoomTween({
        height: this.sectorH * this.sectorsNumber
    });

    this.addZoomTween({
        x: (-this.sectorW) * sectorX
    });

    this.addZoomTween({
        y: (-this.sectorH) * sectorY
    });
}

BackgroundManipulator.prototype.resetZoom = function () {
    this.addZoomTween({
        width: this.sectorW
    });
    this.addZoomTween({
        height: this.sectorH
    });
    this.addZoomTween({
        x: 0
    });
    this.addZoomTween({
        y: 0
    });
};