SAPIGame = function () {

    /**
     * Сделать ход в игре.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     * @param x {Number}
     * @param y {Number}
     */
    this.doMove = function (cntx, gameId, x, y) {
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
        Statistic.add(cntx.userId, Statistic.ID_GAME_DO_MOVE);
        ActionsGame.doMove(cntx.userId, gameId, x, y, function (game) {
            if (game.isInvitation) {
                CAPIGame.updateMove(LogicXO.getOpponentUserId(game, cntx.userId), game.id, game.lastMove.x, game.lastMove.y);
            }
            var lookers = LogicGameLookers.get(game.id);
            for (var userId in lookers) {
                CAPIGame.updateMove(userId, game.id, game.lastMove.x, game.lastMove.y);
            }
        });
    };


    /**
     * Проверим, есть ли победитель.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.checkWinner = function (cntx, gameId) {
        var game, winLine, oldStatus;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRobotGame.checkWinner: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIRobotGame.checkWinner: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        DataGame.getById(gameId, function (game) {
            if (!game || !game.id) {
                Logs.log("SAPIGame.checkWinner: game does not exits.", Logs.LEVEL_WARNING, gameId);
                return;
            }
            oldStatus = game.status;
            winLine = LogicXO.findWinLine(game);
            game = LogicXO.setOutcomeResults(game, winLine);
            if (oldStatus == LogicXO.STATUS_RUN && game.winnerId) {
                LogicUser.onWin(game.winnerId, game);
            }
            DataGame.save(game, function (game) {
                // @todo CAPIGame.winData
                CAPIGame.updateInfo(game.creatorUserId, game);
                if (!game.vsRobot) {
                    CAPIGame.updateInfo(game.joinerUserId, game);
                }
            });
        });
    };


    /**
     * Закроем игру, обычно это означает, что игрок вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     */
    this.close = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.close: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.close: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_GAME_CLOSE_RANDOM_GAME);
        ActionsGame.close(cntx.userId, gameId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
            var lookers = LogicGameLookers.get(game.id);
            lookers.forEach(function (userId) {
                CAPIGame.updateInfo(userId, game);
            });
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
