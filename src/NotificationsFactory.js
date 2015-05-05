function NotificationsFactory(game) {
    this.game = game;
    this.notifications = {};
}

/**
 * Add notification.
 * @param {String} id notification's id
 * @param {String} text notification's text
 * @param {Number} posX notification's pos x
 * @param {Number} posY notification's pos y
 */
NotificationsFactory.prototype.addNotification = function (id, text, roadObject) {
    this.notifications[id] = new Notification(this.game, id, text, roadObject);
}

/**
 * Show/hide single notification.
 * @param {String}  id   notification's id
 * @param {Boolean} show show/not show
 */
NotificationsFactory.prototype.setNotification = function (id, show) {
    var notification = this.getNotification(id);
    notification.update();
    notification.textObject.visible = show;
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