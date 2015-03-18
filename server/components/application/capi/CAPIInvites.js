CAPIInvites = function () {

    /**
     * Отправить клиенту новое сообщение.
     * @param toUserId {Number} кому отправляем.
     * @param whoId {Number} внутрений id пользователя, который пригласил.
     * @param whomId {Number} внутрений id пользователя, которого пригласили.
     * @param fieldTypeId {Number}
     * @param signId {Number}
     */
    this.receive = function (toUserId, whoId, whomId, fieldTypeId, signId) {
        LogicUser.sendToUser(toUserId, 'CAPIInvites', 'receive', [whoId, whomId, fieldTypeId, signId]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();