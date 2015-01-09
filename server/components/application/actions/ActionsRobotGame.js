ActionsRobotGame = function () {
    var self = this;

    /**
     * Создание игры с роботом.
     * @param userId {Object} id пользователя.
     * @param fieldTypeId {Number} Запрашиваемый тип поля, LogicXO.FIELD_TYPE_*
     * @param signId {Number} Запрашиваемый знак в игре, LogicXO.SIGN_ID_*
     * @param callback {Function}
     */
    this.createGame = function (userId, fieldTypeId, signId, callback) {
        var game;
        Logs.log("ActionsRobotGame.createRandomGame", Logs.LEVEL_DETAIL);
        game = LogicXO.create(userId, signId, fieldTypeId, false, false, true);
        game = LogicXO.setSigns(game);
        game = LogicXO.run(game);
        DataGame.save(game, function (game) {
            LogicGameStore.save(game);
            callback(game);
        });
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
            Logs.log("ActionsRobotGame.doMove. game not found", Logs.LEVEL_WARNING, arguments);
            return;
        }
        if (!LogicXO.userCandDoMove(game, userId, x, y)) {
            Logs.log("ActionsRobotGame.doMove. current user can't go right now", Logs.LEVEL_DETAIL);
            return;
        }
        if (!game.vsRobot) {
            Logs.log("ActionsRobotGame.doMove. User cannot do move, because is not random game.", Logs.LEVEL_WARNING, {game: game, userId: userId});
            return;
        }
        oldStatus = game.status;
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
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
ActionsRobotGame = new ActionsRobotGame();