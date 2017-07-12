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
        var prid = Profiler.start(Profiler.ID_USER_IS_BUSY);
        cntx.user.isBusy = true;
        LogicUser.sendToAll(CAPIUserState.isBusy, cntx.userId);
        Profiler.stop(Profiler.ID_USER_IS_BUSY, prid);
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
        var prid = Profiler.start(Profiler.ID_USER_IS_NO_BUSY);
        cntx.user.isBusy = false;
        LogicUser.sendToAll(CAPIUserState.isNoBusy, cntx.userId);
        Profiler.stop(Profiler.ID_USER_IS_NO_BUSY, prid);
    };

    /**
     * Сообщает, что пользователь в игре.
     * если gameId = 0 - то он вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     * @param vsRobot {boolean}
     */
    this.onGame = function (cntx, gameId, vsRobot) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIUserState.onGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (typeof gameId != 'number') {
            Logs.log("SAPIUserState.onGame: must have gameId with type number", Logs.LEVEL_WARNING, {arguments: arguments, gameIdType: typeof gameId});
            return;
        }
        if (typeof vsRobot != 'boolean') {
            Logs.log("SAPIUserState.onGame: must have vsRobot with type boolean", Logs.LEVEL_WARNING, {arguments: arguments, vsRobotType: typeof vsRobot});
            return;
        }
        var prid = Profiler.start(Profiler.ID_USER_ON_GAME);
        cntx.user.onGameId = gameId;
        cntx.user.vsRobot = vsRobot;
        LogicUser.sendToAll(CAPIUserState.onGame, cntx.userId, gameId, vsRobot);
        Profiler.stop(Profiler.ID_USER_ON_GAME, prid);
    };
};
/**
 * Статичный класс.
 * @type {SAPIUserState}
 */
SAPIUserState = new SAPIUserState();
