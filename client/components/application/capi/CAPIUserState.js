CAPIUserState = function () {

    /**
     * Оповещение, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который занят.
     */
    this.isBusy = function (cntx, userId) {
        LogicUser.updateUserInfo({id: userId, isBusy: true});
        LogicInvites.clearInvitesByUserId(userId);
    };

    /**
     * Оповещение, что пользователь не занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который не занят.
     */
    this.isNoBusy = function (cntx, userId) {
        LogicUser.updateUserInfo({id: userId, isBusy: false});
    };

    /**
     * Оповещение, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который занят.
     * @param gameId {Number} id игры.
     */
    this.onGame = function (cntx, userId, gameId) {
        LogicUser.updateUserInfo({id: userId, onGameId: gameId});
    };
};

/**
 * Константный класс.
 * @type {CAPIUserState}
 */
CAPIUserState = new CAPIUserState();