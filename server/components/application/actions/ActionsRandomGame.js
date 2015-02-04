ActionsRandomGame = function () {
    var self = this;

    /**
     * Начать случайную игру согласно параметрам.
     * @param userId {Object} id пользователя.
     * @param fieldTypeId {Number} Запрашиваемый тип поля, LogicXO.FIELD_TYPE_*
     * @param requestedSignId {Number} Запрашиваемый знак в игре, LogicXO.SIGN_ID_*
     * @param callback {Function}
     */
    this.requestRandomGame = function (userId, fieldTypeId, requestedSignId, callback) {
        var waiter;
        Profiler.start(Profiler.ID_SAPIGAME_REQUEST_RANDOM_GAME);
        Logs.log("ActionsRandomGame.requestRandomGame", Logs.LEVEL_DETAIL);
        waiter = LogicWaitersStack.getWaiter(userId, fieldTypeId, requestedSignId, 1);
        if (waiter) {
            Profiler.start(Profiler.ID_ACTIONSRANDOMGAME_CREATE_RANDOM_GAME);
            ActionsRandomGame.createRandomGame(waiter.userId, waiter.signId, fieldTypeId, userId, requestedSignId, function (game) {
                callback(game);
                Profiler.stop(Profiler.ID_ACTIONSRANDOMGAME_CREATE_RANDOM_GAME);
                Profiler.stop(Profiler.ID_SAPIGAME_REQUEST_RANDOM_GAME);

            });
        } else {
            Profiler.start(Profiler.ID_ACTIONSRANDOMGAME_CREATE_WAITER);
            LogicWaitersStack.createWaiter(userId, fieldTypeId, requestedSignId, 1);
            Profiler.stop(Profiler.ID_SAPIGAME_REQUEST_RANDOM_GAME);
            Profiler.stop(Profiler.ID_ACTIONSRANDOMGAME_CREATE_WAITER);
        }
    };

    /**
     * Отменим запросы случаной игры для пользователя.
     * @param userId {Number} id пользователя.
     */
    this.cancelRandomGameRequests = function (userId) {
        Profiler.start(Profiler.ID_SAPIGAME_CANCEL_RANDOM_GAME);
        LogicWaitersStack.deleteByUserId(userId);
        Profiler.stop(Profiler.ID_SAPIGAME_CANCEL_RANDOM_GAME);
    };

    /**
     * Создание случайной игры для двух игроков.
     * - создадим случайную игру;
     * - присоединим туда обоих участников;
     * - установим знаки;
     * - запустим;
     * - сохраним в бд.
     * - разошлем оповещение.
     * @param creatorUserId {Number} id юзера.
     * @param creatorSignId {Number} запршиваемый знак создателя игры.
     * @param fieldTypeId {Number} тип поля, LogicXO.FIELD_TYPE_*
     * @param joinerUserId {Number}  id юзера.
     * @param joinerSignId {Number} запршиваемый знак вступающего в игру.
     */
    this.createRandomGame = function (creatorUserId, creatorSignId, fieldTypeId, joinerUserId, joinerSignId, callback) {
        var game;
        Logs.log("ActionsRandomGame.createRandomGame", Logs.LEVEL_DETAIL);
        game = LogicXO.create(creatorUserId, creatorSignId, fieldTypeId, true, false, false);
        game = LogicXO.joinGame(joinerUserId, joinerSignId, game);
        game = LogicXO.chooseSigns(game);
        game = LogicXO.run(game);
        DataGame.save(game, function (game) {
            LogicGameStore.save(game);
            callback(game);
        });
    };

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
            Logs.log("ActionsRandomGame.closeGame. User cannot close this game", Logs.LEVEL_WARNING, {
                game: game,
                userId: userId
            });
            return;
        }
        if (!game.isRandom) {
            Logs.log("ActionsRandomGame.closeGame. User cannot close this game. Because is not random game.", Logs.LEVEL_WARNING, {
                game: game,
                userId: userId
            });
            return;
        }
        game = LogicXO.close(game);
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