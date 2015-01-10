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
        ActionsRobotGame.createGame(cntx.userId, fieldTypeId, signId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.gameCreated(game.creatorUserId, game.id);
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
        game = LogicGameStore.load(gameId);
        if (!gameId) {
            Logs.log("SAPIRobotGame.checkWinner: game does not exits.", Logs.LEVEL_WARNING, gameId);
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
            });
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
        game = LogicGameStore.load(gameId);
        if (!game) {
            Logs.log("ActionsRobotGame.closeGame. Game to Close not found in Store", Logs.LEVEL_WARNING, {userId: cntx.userId, gameId: gameId});
            return;
        }
        /* 0 - это id робота, хотя самого роботоа не существует физически. */
        if (!LogicXO.userCanCloseGame(game, 0)) {
            Logs.log("ActionsRobotGame.closeGame. User cannot close this game", Logs.LEVEL_WARNING, {game: game, userId: cntx.userId});
            return;
        }
        if (!game.vsRobot) {
            Logs.log("ActionsRobotGame.closeGame. User cannot close this game. Because is not random game.", Logs.LEVEL_WARNING, {game: game, userId: cntx.userId});
            return;
        }
        game = LogicXO.close(game);
        LogicGameStore.delete(game.id);
        LogicRobot.removeState(game.id);
        DataGame.save(game, function (game) {
            CAPIChat.getNewMessage(game.creatorUserId, game.creatorUserId, 'message', 12321321);
            CAPIGame.updateInfo(game.creatorUserId, game);
        });
    };
};

/**
 * Статичный класс.
 * @type {SAPIRobotGame}
 */
SAPIRobotGame = new SAPIRobotGame();
