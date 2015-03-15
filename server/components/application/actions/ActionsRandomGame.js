ActionsRandomGame = function () {
    var self = this;

    /**
     * Закроем игру.
     * @param userId {Number} id пользователя.
     * @param gameId {Number} id игры, которую закроем.
     * @param callback {Function}
     */
    this.closeGame = function (userId, gameId, callback) {
        var game;
        game = LogicGameStore.load(gameId);
        if (!game) {
            Logs.log("ActionsRandomGame.closeGame. Game to Close not found in Store", Logs.LEVEL_WARNING, {
                userId: userId,
                gameId: gameId
            });
            return;
        }
        if (!LogicXO.userCanCloseGame(game, userId)) {
            Logs.log("ActionsRandomGame.closeGame. User cannot close this game...", Logs.LEVEL_WARNING, {
                game: game,
                userId: userId
            });
            return;
        }
        if (game.isRandom == 0 && game.isInvitation == 0 && game.vsRobot == 0) {
            Logs.log("ActionsRandomGame.closeGame. User cannot close this game. Because is not random or invitation game.", Logs.LEVEL_WARNING, {
                game: game,
                userId: userId
            });
            return;
        }
        game = LogicXO.close(game);
        if (game.vsRobot) {
            LogicRobot.removeState(game.id);
        }
        Logs.log("Close game!", Logs.LEVEL_DETAIL, {userId: userId, gameId: gameId, game: game});
        callback(game);
    };

    /**
     * Сделать ход в игре.
     * @param userId {Number} id игрока
     * @param gameId {Number} id игры
     * @param x {Number}
     * @param y {Number}
     * @param checkWinner {Boolean}
     * @param callback {Function}
     */
    this.doMove = function (userId, gameId, x, y, checkWinner, callback) {
        var game, user, winLine, oldStatus;
        game = LogicGameStore.load(gameId);
        if (!game) {
            Logs.log("ActionsRandomGame.doMove. game not found", Logs.LEVEL_WARNING, arguments);
            return;
        }
        if (!LogicXO.userCanDoMove(game, userId, x, y)) {
            Logs.log("current user can't go right now", Logs.LEVEL_DETAIL);
            return;
        }
        if (!game.isRandom) {
            Logs.log("ActionsRandomGame.doMove. User cannot do move, because is not random game.", Logs.LEVEL_WARNING, {
                game: game,
                userId: userId
            });
            return;
        }
        oldStatus = game.status;
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        game.lastMove = {x: x, y: y};
        if (checkWinner) {
            winLine = LogicXO.findWinLine(game);
            game = LogicXO.setOutcomeResults(game, winLine);
        }
        LogicGameStore.save(game);
        callback(game, oldStatus);
    };
};

/**
 * Константный класс.
 * @type {ActionsRandomGame}
 */
ActionsRandomGame = new ActionsRandomGame();