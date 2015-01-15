SAPIUserState = function () {

    /**
     * Сообщает, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     */
    this.isBusy = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIUserState.isBusy: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        LogicUser.sendToAll(CAPIUserState.isBusy, cntx.userId);
    };

    /**
     * Сообщает, что пользователь свободен.
     * @param cntx {Object} контекст соединения.
     */
    this.isNoBusy = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIUserState.isNoBusy: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        LogicUser.sendToAll(CAPIUserState.isNoBusy, cntx.userId);
    };

    /**
     * Сообщает, что пользователь в игре.
     * если gameId = 0 - то он вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.onGame = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIUserState.onGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (typeof gameId != 'number') {
            Logs.log("SAPIUserState.onGame: must have gameId with type number", Logs.LEVEL_WARNING, gameId);
            return;
        }
        LogicUser.sendToAll(CAPIUserState.onGame, cntx.userId, gameId);
    };
};
/**
 * Статичный класс.
 * @type {SAPIUserState}
 */
SAPIUserState = new SAPIUserState();
