function NotificationsFactory(game) {
    this.game = game;
    this.notifications = {};

    var presenterSprite = this.game.add.sprite(250, 450, 'presenter');
    presenterSprite.scale.setTo(0.4, 0.4);

    this.presenter = presenterSprite;
}

/**
 * Add notification.
 * @param {String}   id         notification's id
 * @param {Array}    textArray  [[Description]]
 * @param {Object} roadObject [[Description]]
 */
NotificationsFactory.prototype.addNotification = function (id, textArray, roadObject) {
    this.notifications[id] = new Notification(this.game, id, textArray, roadObject, this.presenter);
}

/**
 * Show/hide single notification.
 * @param {String}  id   notification's id
 * @param {Boolean} show show/not show
 */
NotificationsFactory.prototype.setNotification = function (id, show) {
    var notification = this.getNotification(id);
    notification.update();

    notification.texts.forEach(function (entry) {
        entry.visible = show;
    });

    if (show == true) {
        notification.balloonGrow();
    } else {
        notification.balloonShrink();
    }
}

/**
 * Display notification with given time delay and duration.
 * @param {String} id       Notification's id.
 * @param {Number} delay    Notification's display start delay.
 * @param {Number} duration Notification's display duration.
 */
NotificationsFactory.prototype.startNotification = function (id, delay, duration) {
    this.game.time.events.add(Phaser.Timer.SECOND * delay,
        function () {
            this.setNotification(id, true);
            this.game.time.events.add(Phaser.Timer.SECOND * duration,
                function () {
                    this.setNotification(id, false);
                }, this);
        }, this);
}

NotificationsFactory.prototype.getNotification = function (id) {
    return this.notifications[id];
}