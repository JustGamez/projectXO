SAPIRobotGame = function () {

    /**
     * Создание игры с роботом
     * @param cntx {Object} контекст соединения.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.createGame = function (cntx, fieldTypeId, signId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRobotGame.createGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!fieldTypeId || !(fieldTypeId == LogicXO.FIELD_TYPE_3X3 || fieldTypeId == LogicXO.FIELD_TYPE_15X15)) {
            Logs.log("SAPIRobotGame.createGame: must have fieldTypeId", Logs.LEVEL_WARNING, fieldTypeId);
            return;
        }
        if (!signId || !(signId == LogicXO.SIGN_ID_X || signId == LogicXO.SIGN_ID_O || signId == LogicXO.SIGN_ID_Empty)) {
            Logs.log("SAPIRobotGame.createGame: must have signId", Logs.LEVEL_WARNING, signId);
            return;
        }
        var prid = Profiler.start(Profiler.ID_CREATE_ROBOT_GAME);
        Statistic.add(cntx.userId, Statistic.ID_GAME_ROBOT_CREATE);
        ActionsRobotGame.createGame(cntx.userId, fieldTypeId, signId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.gameCreated(game.creatorUserId, game.id);
            Profiler.stop(Profiler.ID_CREATE_ROBOT_GAME, prid);
        });
    };

    /**
     * Закроем игру, обычно это означает, что игрок вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     */
    this.close = function (cntx, gameId) {
        var game;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.close: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.close: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        var prid = Profiler.start(Profiler.ID_ROBOT_CLOSE_GAME);
        Statistic.add(cntx.userId, Statistic.ID_CLOSE_GAME);
        ActionsGame.close(cntx.userId, gameId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            var lookers = LogicGameLookers.get(game.id);
            for (var userId in lookers) {
                CAPIGame.updateInfo(userId, game);
            }
            Profiler.stop(Profiler.ID_ROBOT_CLOSE_GAME);
        });
    };

    this.raiseAIMove = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.raiseAIMove: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.raiseAIMove: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        ActionsRobotGame.raiseAIMove(gameId);
    }
};

/**
 * Статичный класс.
 * @type {SAPIRobotGame}
 */
SAPIRobotGame = new SAPIRobotGame();
