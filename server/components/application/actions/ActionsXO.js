ActionsXO = function () {
    var self = this;

    /**
     * Начать случайную игру согласно параметрам.
     * @param userId {Object} id пользователя.
     * @param fieldTypeId {Number} Запрашиваемый тип поля, LogicXO.FIELD_TYPE_*
     * @param requestedSignId {Number} Запрашиваемый знак в игре, LogicXO.SIGN_ID_*
     */
    this.requestRandomGame = function (userId, fieldTypeId, requestedSignId) {
        var waiter;
        Logs.log("ActionsXO.requestRandomGame", Logs.LEVEL_DETAIL);
        waiter = LogicWaitersStack.getWaiter(userId, fieldTypeId, requestedSignId, 1);
        if (waiter) {
            ActionsXO.createRandomGame(waiter.userId, waiter.signId, fieldTypeId, userId, requestedSignId);
        } else {
            LogicWaitersStack.createWaiter(userId, fieldTypeId, requestedSignId, 1);
        }
    };

    /**
     * Отменим запросы случаной игры для пользователя.
     * @param userId {Number} id пользователя.
     */
    this.cancelRandomGameRequests = function (userId) {
        LogicWaitersStack.deleteByUserId(userId);
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
    this.createRandomGame = function (creatorUserId, creatorSignId, fieldTypeId, joinerUserId, joinerSignId) {
        var game;
        Logs.log("ActionsXO.createRandomGame", Logs.LEVEL_DETAIL);
        game = LogicXO.create(creatorUserId, creatorSignId, fieldTypeId, true, false, false);
        game = LogicXO.joinGame(joinerUserId, joinerSignId, game);
        game = LogicXO.setSigns(game);
        game = LogicXO.run(game);
        DataGame.save(game, function (game) {
            LogicGameStore.save(game);
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
            CAPIGame.gameCreated(game.creatorUserId, game.id);
            CAPIGame.gameCreated(game.joinerUserId, game.id);
        });
    };

    /**
     * Закроем игру.
     * @param userId {Number} id пользователя.
     * @param gameId {Number} id игры, которую закроем.
     */
    this.closeGame = function (userId, gameId) {
        var game;
        game = LogicGameStore.load(gameId);
        if (!game) {
            Logs.log("ActionsXO. Game to Close not found in Store", Logs.LEVEL_WARNING, {userId: userId, gameId: gameId});
            return;
        }
        if (!LogicXO.userCanCloseGame(game, userId)) {
            Logs.log("ActionsXO. User cannot close this game", Logs.LEVEL_WARNING, {game: game, userId: userId});
            return;
        }
        game = LogicXO.close(game);
        LogicGameStore.delete(game.id);
        DataGame.save(game, function (game) {
            /* @todo check user.isOnline? */
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
        });
    };

    /**
     * Сделать ход в игре.
     * @param userId {Number} id игрока
     * @param gameId {Number} id игры
     * @param x {Number}
     * @param y {Number}
     * @param checkWinner {Boolean}
     */
    this.doMove = function (userId, gameId, x, y, checkWinner) {
        var game, user, winLine;
        game = LogicGameStore.load(gameId);
        if (!game) {
            Logs.log("ActionsXO.doMove. game not found", Logs.LEVEL_WARNING, arguments);
            return;
        }
        if (!LogicXO.userCandDoMove(game, userId, x, y)) {
            Logs.log("current user can't go right now", Logs.LEVEL_DETAIL);
            return;
        }
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        if (checkWinner) {
            winLine = LogicXO.findWinLine(game);
            game = LogicXO.setOutcomeResults(game, winLine);
            if (game.status == LogicXO.STATUS_SOMEBODY_WIN || game.status == LogicXO.STATUS_NOBODY_WIN) {
                /* @todo */
                LogicGameStore.delete(game.id);
                DataGame.save(game, function (game) {
                    CAPIGame.updateInfo(game.creatorUserId, game);
                    CAPIGame.updateInfo(game.joinerUserId, game);
                })
            }
        } else {
            LogicGameStore.save(game);
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
        }
    };
};

/**
 * Константный класс.
 * @type {ActionsXO}
 */
ActionsXO = new ActionsXO();