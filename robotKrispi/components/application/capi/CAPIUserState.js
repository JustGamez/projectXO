CAPIUserState = function () {

    /**
     * Оповещение, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который занят.
     */
    this.isBusy = function (cntx, userId) {
        /* Nothing to do */
    };

    /**
     * Оповещение, что пользователь не занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который не занят.
     */
    this.isNoBusy = function (cntx, userId) {
        /* Nothing to do */
    };

    /**
     * Оповещение, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который занят.
     * @param gameId {Number} id игры.
     */
    this.onGame = function (cntx, userId, gameId) {
        /* Nothing to do */
    };
};

/**
 * Константный класс.
 * @type {CAPIUserState}
 */
CAPIUserState = new CAPIUserState();