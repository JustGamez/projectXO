CAPIInvites = function () {

    /**
     * Получение приглашения.
     * @param cntx контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.receive = function (cntx, whoId, whomId) {
        /* Nothing to do. */
    };

    /**
     * Оповещение о том, что игра создана.
     * @param cntx контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        /* Nothing to do. */
    };
};

/**
 * Статичный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();