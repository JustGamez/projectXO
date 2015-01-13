CAPIInvites = function () {

    /**
     * Отправить клиенту новое сообщение.
     * @param toUserId {Number} кому отправляем.
     * @param whoId {Number} данные об игре.
     * @param whomId {Number} данные об игре.
     */
    this.receive = function (toUserId, whoId, whomId) {
        LogicUser.sendToUser(toUserId, 'CAPIInvites', 'receive', [whoId, whomId]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();