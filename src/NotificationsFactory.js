function NotificationsFactory(game, instructionTexts, presenterSprite) {
    this.game = game;
    this.notifications = {};
    // needed for startNotification() when starting notification from situation's init
    this.instructionTexts = instructionTexts;

    this.presenterSprite = presenterSprite;
}

/**
 * Add notification.
 * @param {String}   id         notification's id
 *                              @param {Array}    textArray  [[Description]]
 * @param {Object} roadObject [[Description]]
 */
NotificationsFactory.prototype.addNotification = function (id, textArray, x, y) {
    this.notifications[id] = new Notification(this, this.game, id, textArray, this.presenterSprite, x, y);
};

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
};

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
            if (duration !== undefined) {
                this.game.time.events.add(Phaser.Timer.SECOND * duration,
                    function () {
                        this.setNotification(id, false);
                    }, this);
            }
        },

        this);
};

NotificationsFactory.prototype.startAllNotifications = function (delay, duration) {
    for (key in this.notifications) {
        this.startNotification(key, delay, duration);
    }
}

NotificationsFactory.prototype.getNotification = function (id) {
    return this.notifications[id];
};