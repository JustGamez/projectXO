SAPIGame = function () {

    /**
     * Закроем игру, обычно это означает, что игрок вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     */
    this.closeGame = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.closeGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.closeGame: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_GAME_CLOSE_RANDOM_GAME);
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
        var prid = Profiler.start(Profiler.ID_DO_MOVE);
        Statistic.add(cntx.userId, Statistic.ID_GAME_DO_MOVE);
        ActionsRandomGame.doMove(cntx.userId, gameId, x, y, checkWinner, function (game, oldStatus) {
            CAPIGame.updateMove(game.creatorUserId, game.id, game.lastMove.x, game.lastMove.y);
            CAPIGame.updateMove(game.joinerUserId, game.id, game.lastMove.x, game.lastMove.y);
            /* Если не запущена, сливаем в БД, т.к. игра закончиалсь. */
            if (game.status != LogicXO.STATUS_RUN) {
                /* Только что кто-то выиграл? */
                if (oldStatus == LogicXO.STATUS_RUN && game.status == LogicXO.STATUS_SOMEBODY_WIN) {
                    LogicUser.onWin(game.winnerId, game);
                }
                LogicGameStore.delete(game.id);
                DataGame.save(game, function (game) {
                    // is it win updating
                    CAPIGame.updateInfo(game.creatorUserId, game);
                    CAPIGame.updateInfo(game.joinerUserId, game);
                })
            }
            Profiler.stop(Profiler.ID_DO_MOVE, prid);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
