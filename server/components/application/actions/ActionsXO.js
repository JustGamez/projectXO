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
        game = LogicXO.createGame(creatorUserId, creatorSignId, fieldTypeId, true, false, false);
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
};

/**
 * Константный класс.
 * @type {ActionsXO}
 */
ActionsXO = new ActionsXO();