ActionsGame = function () {
    var self = this;

    /**
     * Сделать ход в игре.
     * @param userId {Number} id игрока
     * @param gameId {Number} id игры
     * @param x {Number}
     * @param y {Number}
     * @param callback {Function}
     */
    this.doMove = function (userId, gameId, x, y, callback) {
        DataGame.getById(gameId, function (game) {
            if (!game) {
                Logs.log("ActionsGame.doMove. game not found", Logs.LEVEL_WARNING, arguments);
                return;
            }
            if (!LogicXO.userCanDoMove(game, userId, x, y)) {
                Logs.log("current user can't go right now", Logs.LEVEL_WARNING, arguments);
                return;
            }
            game = LogicXO.setSign(game, x, y);
            game = LogicXO.switchTurn(game);
            DataGame.save(game, callback);
        });
    };

    /**
     * Закроем игру.
     * @param userId {Number} id пользователя.
     * @param gameId {Number} id игры, которую закроем.
     * @param callback {Function}
     */
    this.close = function (userId, gameId, callback) {
        DataGame.getById(gameId, function (game) {
            if (!game) {
                Logs.log("ActionsGame.close. Game to Close not found in Store", Logs.LEVEL_WARNING, {userId: userId, gameId: gameId});
                return;
            }
            if (!LogicXO.userCanCloseGame(game, userId)) {
                Logs.log("ActionsGame.close. User cannot close this game...", Logs.LEVEL_WARNING, {game: game, userId: userId});
                return;
            }
            game = LogicXO.close(game);
            Logs.log("Close game!", Logs.LEVEL_DETAIL, {userId: userId, gameId: gameId, game: game});
            DataGame.save(game, function (game) {
                callback(game);
                LogicUser.onGameClose(userId, game);
            });
        });
    };
};

/**
 * Константный класс.
 * @type {ActionsGame}
 */
ActionsGame = new ActionsGame();
