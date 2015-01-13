SAPIInvites = function () {

    /**
     * Отправка приглашения на сервер.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.send = function (whoId, whomId) {
        apiRouter.executeRequest('SAPIInvites', 'send', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIInvites}
 */
SAPIInvites = new SAPIInvites();