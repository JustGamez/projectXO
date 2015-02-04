SAPIGame = function () {

    /**
     * Запрос на создание игры.
     * @param cntx {Object} контекст соединения.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.requestRandomGame = function (cntx, fieldTypeId, signId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.startRandomGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!fieldTypeId || !(fieldTypeId == LogicXO.FIELD_TYPE_3X3 || fieldTypeId == LogicXO.FIELD_TYPE_15X15)) {
            Logs.log("SAPIGame.startRandomGame: must have fieldTypeId", Logs.LEVEL_WARNING, fieldTypeId);
            return;
        }
        if (!signId || !(signId == LogicXO.SIGN_ID_X || signId == LogicXO.SIGN_ID_O || signId == LogicXO.SIGN_ID_Empty)) {
            Logs.log("SAPIGame.startRandomGame: must have signId", Logs.LEVEL_WARNING, signId);
            return;
        }
        ActionsRandomGame.requestRandomGame(cntx.userId, fieldTypeId, signId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
            CAPIGame.gameCreated(game.creatorUserId, game.id);
            CAPIGame.gameCreated(game.joinerUserId, game.id);
        });
    };

    /**
     * Отменим запросы случаной игры для пользователя.
     * @param cntx {Object} контекст соединения.
     */
    this.cancelRandomGameRequests = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.cancelRandomGameRequest: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        ActionsRandomGame.cancelRandomGameRequests(cntx.userId);
    };

    /**
     * Закроем игру, обычно это означает, что игрок вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     */
    this.closeRandomGame = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.closeRandomGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.closeRandomGame: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        ActionsRandomGame.closeGame(cntx.userId, gameId, function (game) {
            LogicGameStore.delete(game.id);
            DataGame.save(game, function (game) {
                CAPIGame.updateInfo(game.creatorUserId, game);
                CAPIGame.updateInfo(game.joinerUserId, game);
            });
        });
    };

    /**
     * Сделать ход в игре.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     * @param x {Number}
     * @param y {Number}
     * @param checkWinner {Boolean}
     */
    this.doMove = function (cntx, gameId, x, y, checkWinner) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.doMove: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.doMove: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (x == undefined || typeof x != 'number') {
            Logs.log("SAPIGame.doMove: must have x with type number", Logs.LEVEL_WARNING, x);
            return;
        }
        if (y == undefined || typeof y != 'number') {
            Logs.log("SAPIGame.doMove: must have y with type number", Logs.LEVEL_WARNING, y);
            return;
        }
        if (checkWinner == undefined || typeof checkWinner != 'boolean') {
            Logs.log("SAPIGame.doMove: must have checkWinner with type boolean", Logs.LEVEL_WARNING, [checkWinner, typeof checkWinner]);
            return;
        }
        Profiler.start(Profiler.ID_SAPIGAME_DO_MOVE);
        ActionsRandomGame.doMove(cntx.userId, gameId, x, y, checkWinner, function (game, oldStatus) {
            /* Если не ран, сливаем в БД, т.к. игра закончиалсь. */
            if (game.status != LogicXO.STATUS_RUN) {
                /* Только что кто-то выиграл? */
                if (oldStatus == LogicXO.STATUS_RUN && game.status == LogicXO.STATUS_SOMEBODY_WIN) {
                    LogicUser.onWin(game.winnerId);
                }
                LogicGameStore.delete(game.id);
                DataGame.save(game, function (game) {
                    CAPIGame.updateInfo(game.creatorUserId, game);
                    CAPIGame.updateInfo(game.joinerUserId, game);
                })
            }
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
            Profiler.stop(Profiler.ID_SAPIGAME_DO_MOVE);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
