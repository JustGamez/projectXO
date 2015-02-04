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
        Profiler.start(Profiler.ID_SAPIUSERSTATE_IS_BUSY);
        LogicUser.sendToAll(CAPIUserState.isBusy, cntx.userId);
        Profiler.stop(Profiler.ID_SAPIUSERSTATE_IS_BUSY);
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
        Profiler.start(Profiler.ID_SAPIUSERSTATE_IS_NO_BUSY);
        LogicUser.sendToAll(CAPIUserState.isNoBusy, cntx.userId);
        Profiler.stop(Profiler.ID_SAPIUSERSTATE_IS_NO_BUSY);
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
        Profiler.start(Profiler.ID_SAPIUSERSTATE_ON_GAME);
        LogicUser.sendToAll(CAPIUserState.onGame, cntx.userId, gameId);
        Profiler.stop(Profiler.ID_SAPIUSERSTATE_ON_GAME);
    };
};
/**
 * Статичный класс.
 * @type {SAPIUserState}
 */
SAPIUserState = new SAPIUserState();
