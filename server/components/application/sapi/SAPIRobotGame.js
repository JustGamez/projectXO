SAPIRobotGame = function () {

    /**
     * Создание игры с роботом
     * @param cntx {Object} контекст соединения.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.startGame = function (cntx, fieldTypeId, signId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRobotGame.startGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!fieldTypeId || !(fieldTypeId == LogicXO.FIELD_TYPE_3X3 || fieldTypeId == LogicXO.FIELD_TYPE_15X15)) {
            Logs.log("SAPIRobotGame.startGame: must have fieldTypeId", Logs.LEVEL_WARNING, fieldTypeId);
            return;
        }
        if (!signId || !(signId == LogicXO.SIGN_ID_X || signId == LogicXO.SIGN_ID_O || signId == LogicXO.SIGN_ID_Empty)) {
            Logs.log("SAPIRobotGame.startGame: must have signId", Logs.LEVEL_WARNING, signId);
            return;
        }
        Profiler.start(Profiler.ID_SAPIROBOT_CREATE_GAME);
        Statistic.add(cntx.userId, Statistic.ID_GAME_ROBOT_CREATE);
        ActionsRobotGame.createGame(cntx.userId, fieldTypeId, signId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.gameCreated(game.creatorUserId, game.id);
            Profiler.stop(Profiler.ID_SAPIROBOT_CREATE_GAME);
        });
    };

    /**
     * Сделать ход в игре
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     * @param x {Number}
     * @param y {Number}
     * @param checkWinner {Boolean}
     */
    this.doMove = function (cntx, gameId, x, y, checkWinner) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRobotGame.doMove: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIRobotGame.doMove: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (x == undefined || typeof x != 'number') {
            Logs.log("SAPIRobotGame.doMove: must have x with type number", Logs.LEVEL_WARNING, x);
            return;
        }
        if (y == undefined || typeof y != 'number') {
            Logs.log("SAPIRobotGame.doMove: must have y with type number", Logs.LEVEL_WARNING, y);
            return;
        }
        if (checkWinner == undefined || typeof checkWinner != 'boolean') {
            Logs.log("SAPIRobotGame.doMove: must have checkWinner with type boolean", Logs.LEVEL_WARNING, [checkWinner, typeof checkWinner]);
            return;
        }
        Profiler.start(Profiler.ID_SAPIROBOT_DO_MOVE);
        ActionsRobotGame.doMove(cntx.userId, gameId, x, y, checkWinner, function (game, oldStatus) {
            /* Если не ран, сливаем в БД, т.к. игра закончиалсь. */
            if (game.status != LogicXO.STATUS_RUN) {
                /* Только что кто-то выиграл? */
                if (oldStatus == LogicXO.STATUS_RUN && game.status == LogicXO.STATUS_SOMEBODY_WIN) {
                    LogicUser.onWin(game.winnerId);
                }
                LogicGameStore.delete(game.id);
                LogicRobot.removeState(game.id);
                DataGame.save(game, function (game) {
                    CAPIGame.updateInfo(game.creatorUserId, game);
                });
            } else {
                ActionsRobotGame.raiseAIMove(game.id)
            }
            Profiler.stop(Profiler.ID_SAPIROBOT_DO_MOVE);
            CAPIGame.updateInfo(game.creatorUserId, game);
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
        Profiler.start(Profiler.ID_SAPIROBOT_CHECKWINNER);
        game = LogicGameStore.load(gameId);
        if (!game || !game.id) {
            Logs.log("SAPIRobotGame.checkWinner: game does not exits.", Logs.LEVEL_WARNING, gameId);
            Profiler.stop(Profiler.ID_SAPIROBOT_CHECKWINNER);
            return;
        }
        oldStatus = game.status;
        winLine = LogicXO.findWinLine(game);
        game = LogicXO.setOutcomeResults(game, winLine);
        /* Если не ран, сливаем в БД, т.к. игра закончиалсь. */
        if (game.status != LogicXO.STATUS_RUN) {
            /* Только что кто-то выиграл? */
            if (oldStatus == LogicXO.STATUS_RUN && game.status == LogicXO.STATUS_SOMEBODY_WIN) {
                if (game.winnerId) {
                    LogicUser.onWin(game.winnerId);
                }
            }
            LogicGameStore.delete(game.id);
            LogicRobot.removeState(game.id);
            DataGame.save(game, function (game) {
                CAPIGame.updateInfo(game.creatorUserId, game);
                Profiler.stop(Profiler.ID_SAPIROBOT_CHECKWINNER);
            });
        } else {
            Profiler.stop(Profiler.ID_SAPIROBOT_CHECKWINNER);
        }
    };

    /**
     * Закроем игру, обычно это означает, что игрок вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     */
    this.closeGame = function (cntx, gameId) {
        var game;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.closeGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.closeGame: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        Profiler.start(Profiler.ID_SAPIROBOT_CLOSE_GAME);

        ActionsRandomGame.closeGame(cntx.userId, gameId, function (game) {
            Statistic.add(cntx.userId, Statistic.ID_GAME_ROBOT_CLOSE);
            LogicGameStore.delete(game.id);
            DataGame.save(game, function (game) {
                CAPIGame.updateInfo(game.creatorUserId, game);
                Profiler.stop(Profiler.ID_SAPIROBOT_CLOSE_GAME);
            });
        });
    };
};

/**
 * Статичный класс.
 * @type {SAPIRobotGame}
 */
SAPIRobotGame = new SAPIRobotGame();
