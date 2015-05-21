function NotificationsFactory(game, instructionTexts, presenterSprite, fx) {
    this.game = game;
    this.notifications = {};
    // needed for startNotification() when starting notification from situation's init
    this.instructionTexts = instructionTexts;

    this.presenterSprite = presenterSprite;
    this.fx = fx;

    this.initAttentionManager();
}

/**
 * Add notification with a callback.
 * @param {String}   id              notification's id
 * @param {Array}    textArray       array with strings to display
 * @param {Number}   x               notification's position x.
 *                                   if undefined: position will be taken from presenter sprite
 * @param {Number}   y               notification's position x.
 *                                   if undefined: position will be taken from presenter sprite
 * @param {Function} callback        callback function
 * @param {Object}   callbackContext callback context
 */
NotificationsFactory.prototype.addNotification = function (
    id, textArray, x, y, callback, callbackContext) {

    var callArgs = Array.prototype.splice.call(arguments, 6);

    this.notifications[id] = new Notification(this, this.game, id, textArray, this.presenterSprite, x, y, this.fx, callback, callbackContext, callArgs);

    return this.notifications[id];

};

/**
 * Show/hide single notification.
 * @param {String}  id   notification's id
 * @param {Boolean} show show/not show
 */
NotificationsFactory.prototype.setNotification = function (id, show) {
    var notification = this.getNotification(id);
    notification.update();

    notification.languageTextObjects.pl.forEach(function (entry) {
        entry.visible = show;
    });

    if (show == true) {
        notification.buttonGrow();
    } else {
        notification.buttonShrink();
    }
};

NotificationsFactory.prototype.setNotificationsAll = function (show) {
    for (key in this.notifications) {
        this.setNotification(key, show);
    }
}

/**
 * Display notification with given time delay and duration.
 * @param {String} id       Notification's id.
 * @param {Number} delay    Notification's display start delay.
 * @param {Number} duration Notification's display duration.
 */
NotificationsFactory.prototype.startNotification = function (id, delay, duration) {
    var timerDelay = delay;
    if (delay === undefined) {
        timerDelay = 0;
    }

    this.game.time.events.add(Phaser.Timer.SECOND * timerDelay,
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

NotificationsFactory.prototype.initAttentionManager = function () {
    this.attentionManager = new AttentionManager(this.game);
};

NotificationsFactory.prototype.attentionShow = function (position) {
    this.attentionManager.show(position);
};

NotificationsFactory.prototype.attentionHide = function () {
    this.attentionManager.hide();
};