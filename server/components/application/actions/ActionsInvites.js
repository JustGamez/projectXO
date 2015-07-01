ActionsInvites = function () {
    var self = this;

    /**
     * Создадим игру, вернём её каллбэком.
     * @param fieldTypeId {Number} id типа поля, LogixXO.FIELD_TYPE_*.
     * @param creatorSignId {Number} id знака запрашиваемого создателем, LogicXO.SIGN_ID_*.
     * @param joinerSignId {Number} id знака запрашиваемого принявшем, LogicXO.SIGN_ID_*.
     * @param creatorUserId {Number} внутрений id пользователя создающего игру.
     * @param joinerUserId {Number} внутрений id второго участника игры.
     * @param callback {Function}
     */
    this.createGame = function (fieldTypeId, creatorSignId, joinerSignId, creatorUserId, joinerUserId, callback) {
        var game;
        Logs.log("ActionsInvites.createGame", Logs.LEVEL_DETAIL, arguments);
        game = LogicXO.create(creatorUserId, creatorSignId, fieldTypeId, false, true, false);
        /* @todo учесть знак второго игрока, пока что любой  */
        game = LogicXO.joinGame(joinerUserId, joinerSignId, game);
        game = LogicXO.chooseSigns(game);
        game = LogicXO.run(game);
        DataGame.save(game, callback);
    };
};

/**
 * Константный класс.
 * @type {ActionsInvites}
 */
ActionsInvites = new ActionsInvites();
