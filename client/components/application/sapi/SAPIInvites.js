SAPIInvites = function () {

    /**
     * Отправка приглашения на сервер.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.send = function (whoId, whomId) {
        apiRouter.executeRequest('SAPIInvites', 'send', arguments, [{connectionId: null}]);
    };

    /**
     * Создание игры по приглашению.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     * @param withUserId {Number} внутрений id юзера с которым создаём игру.
     */
    this.createGame = function (fieldTypeId, signId, withUserId) {
        apiRouter.executeRequest('SAPIInvites', 'createGame', arguments, [{connectionId: null}]);
    };

    /**
     * Закроем игру.
     * @param gameId {Number} id игры.
     */
    this.close = function (gameId) {
        apiRouter.executeRequest('SAPIInvites', 'close', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIInvites}
 */
SAPIInvites = new SAPIInvites();