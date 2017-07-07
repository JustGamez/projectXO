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
        if (!gameId || typeof gameId !== 'number') {
            Logs.log("SAPIGame.doMove: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (x === undefined || typeof x !== 'number') {
            Logs.log("SAPIGame.doMove: must have x with type number", Logs.LEVEL_WARNING, x);
            return;
        }
        if (y === undefined || typeof y === 'number') {
            Logs.log("SAPIGame.doMove: must have y with type number", Logs.LEVEL_WARNING, y);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_DO_MOVE);
        ActionsGame.doMove(cntx.userId, gameId, x, y, function (game) {
            /* Если по приглашению, оповестим оппонента, в игре с роботом этого не нужно. */
            if (game.isInvitation) {
                CAPIGame.updateMove(LogicXO.getOpponentUserId(game, cntx.userId), game.id, game.lastMove.x, game.lastMove.y, game.timerStartPoint);
            }
            var lookers = LogicGameLookers.get(game.id);
            for (var userId in lookers) {
                CAPIGame.updateMove(userId, game.id, game.lastMove.x, game.lastMove.y, game.timerStartPoint);
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
        if (!gameId || typeof gameId !== 'number') {
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
            if (oldStatus === LogicXO.STATUS_RUN && game.status === LogicXO.STATUS_SOMEBODY_WIN && game.winnerId) {
                LogicUser.onWin(game.winnerId, game);
            }
            LogicUser.onGameFinish(game.creatorUserId, game);
            if (!game.vsRobot) LogicUser.onGameFinish(game.joinerUserId, game);
            DataGame.save(game, function (game) {
                CAPIGame.updateInfo(game.creatorUserId, game);
                if (!game.vsRobot) {
                    CAPIGame.updateInfo(game.joinerUserId, game);
                }
            });
        });
    };

    /**
     * Проверим таймер игры.
     * Если время вышло, то сбросим таймер,
     * переключим ход и сообщим, конечно, игрокам об этом :)
     */
    this.checkTimer = function (cntx, gameId) {
        var game;
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
            if (game.status !== LogicXO.STATUS_RUN) {
                Logs.log("SAPI.checkTimer. game is not run, but checkTimer requestd", Logs.LEVEL_WARNING, game);
                return;
            }
            if (LogicXO.timerIsFinished(game)) {
                LogicXO.resetTimer(game);
                LogicXO.switchTurn(game);
                DataGame.save(game, function (game) {
                    CAPIGame.onTimerFinished(game.creatorUserId, game.id, game.timerStartPoint);
                    if (!game.vsRobot) {
                        CAPIGame.onTimerFinished(game.joinerUserId, game.id, game.timerStartPoint);
                    }
                    var lookers = LogicGameLookers.get(game.id);
                    for (var userId in lookers) {
                        CAPIGame.onTimerFinished(userId, game.id, game.timerStartPoint);
                    }
                });
            } else {
                Logs.log("SAPIGame.checkTimer. check timer, but ...", Logs.LEVEL_WARNING, game);
            }
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
        Statistic.add(cntx.userId, Statistic.ID_CLOSE_GAME);
        ActionsGame.close(cntx.userId, gameId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
            var lookers = LogicGameLookers.get(game.id);
            for (var userId in lookers) {
                CAPIGame.updateInfo(userId, game);
            }
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
