CAPIInvites = function () {

    /**
     * Отправить клиенту новое сообщение.
     * @param toUserId {Number} кому отправляем.
     * @param whoId {Number} внутрений id пользователя, который пригласил.
     * @param whomId {Number} внутрений id пользователя, которого пригласили.
     */
    this.receive = function (toUserId, whoId, whomId) {
        LogicUser.sendToUser(toUserId, 'CAPIInvites', 'receive', [whoId, whomId]);
    };

    /**
     * Оповещение о том, что игра создана.
     * @param toUserId {Number} кому отправляем.
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (toUserId, gameId) {
        LogicUser.sendToUser(toUserId, 'CAPIInvites', 'gameCreated', [gameId]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();