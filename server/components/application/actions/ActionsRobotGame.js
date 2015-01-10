ActionsRobotGame = function () {
    var self = this;

    /**
     * Создание игры с роботом.
     * Если ход робота, вызываем его ход.
     * @param userId {Object} id пользователя.
     * @param fieldTypeId {Number} Запрашиваемый тип поля, LogicXO.FIELD_TYPE_*
     * @param signId {Number} Запрашиваемый знак в игре, LogicXO.SIGN_ID_*
     * @param callback {Function}
     */
    this.createGame = function (userId, fieldTypeId, signId, callback) {
        var game;
        Logs.log("ActionsRobotGame.createGame", Logs.LEVEL_DETAIL);
        game = LogicXO.create(userId, signId, fieldTypeId, false, false, true);
        game = LogicXO.chooseSigns(game);
        game = LogicXO.run(game);
        DataGame.save(game, function (game) {
            LogicGameStore.save(game);
            LogicRobot.initState(game);
            /* Если ход робота, то надо сделать ему ход */
            if (LogicXO.isHisTurn(game, 0)) {
                self.raiseAIMove(game.id, function (game) {
                    callback(game);
                });
            }
            callback(game);
        });
    };

    /**
     * Сделать ход в игре, игроком.
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
        if (!LogicXO.userCanDoMove(game, userId, x, y)) {
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
        LogicRobot.saveLastMove(game.id, x, y);
        callback(game, oldStatus);
    };

    /**
     * Выполнить ход искуственным интеллектом.
     * @param gameId {Number}
     * @param callback {Function}
     */
    this.raiseAIMove = function (gameId, callback) {
        var game, AICoords;
        game = LogicGameStore.load(gameId);
        if (!game) {
            Logs.log("ActionsRobotGame.raiseAIMove. game does not exists.", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (!game.vsRobot) {
            Logs.log("ActionsRobotGame.raiseAIMove. game is not vsRobot game.", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (game.status != LogicXO.STATUS_RUN) {
            Logs.log("ActionsRobotGame.raiseAIMove. game is not running.", Logs.LEVEL_WARNING, gameId);
            return;
        }
        /* 0 is bot id, but bot is not exists */
        if (!LogicXO.isHisTurn(game, 0)) {
            Logs.log("ActionsRobotGame.raiseAIMove. Is not turn of robot.", Logs.LEVEL_WARNING, game);
            return;
        }
        /* Тут будет проанализирован последний ход игрока и как добавятся\обновятся линии игрока. */
        LogicRobot.updateGameState(game);
        /* Сюда будем ставить ход. */
        AICoords = LogicRobot.generateMovementCoords(game);
        if (!LogicXO.userCanDoMove(game, 0, AICoords.x, AICoords.y)) {
            Logs.log("ActionsRobotGame.raiseAIMove. Robot can not do move.x:" + AICoords.x + ", y:" + AICoords.y, Logs.LEVEL_WARNING, game);
            return;
        }
        LogicRobot.saveLastMove(game.id, AICoords.x, AICoords.y);
        /* Тут мы добавим\обновим линии робота на основании последнего хода. */
        game = LogicXO.setSign(game, AICoords.x, AICoords.y);
        game = LogicXO.switchTurn(game);
        LogicGameStore.save(game);
        LogicRobot.updateGameState(game);
        callback(game);
    };
};

/**
 * Константный класс.
 * @type {ActionsRandomGame}
 */
ActionsRobotGame = new ActionsRobotGame();