CAPIUserState = function () {

    /**
     * Оповещение, что пользователь занят.
     * @param toUserId {Number} кому отправляем.
     * @param userId {Number} внутрений id пользователя, который занят.
     */
    this.isBusy = function (toUserId, userId) {
        LogicUser.sendToUser(toUserId, 'CAPIUserState', 'isBusy', [userId]);
    };

    /**
     * Оповещение, что пользователь не занят.
     * @param toUserId {Number} кому отправляем.
     * @param userId {Number} внутрений id пользователя, который не занят.
     */
    this.isNoBusy = function (toUserId, userId) {
        LogicUser.sendToUser(toUserId, 'CAPIUserState', 'isNoBusy', [userId]);
    };

    /**
     * Оповещение, что пользователь занят.
     * @param toUserId {Number} кому отправляем.
     * @param userId {Number} внутрений id пользователя, который занят.
     * @param gameId {Number} id игры.
     * @param vsRobot {boolean}
     */
    this.onGame = function (toUserId, userId, gameId, vsRobot) {
        LogicUser.sendToUser(toUserId, 'CAPIUserState', 'onGame', [userId, gameId, vsRobot]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIUserState}
 */
CAPIUserState = new CAPIUserState();