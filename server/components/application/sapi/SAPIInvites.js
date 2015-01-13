SAPIInvites = function () {

    /**
     * Отправка приглашения на сервер.
     * @param cntx {Object} контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.send = function (cntx, whoId, whomId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIInvites.send: must be authorized.", Logs.LEVEL_WARNING);
            return;
        }
        if (!whoId || typeof whoId != 'number') {
            Logs.log("SAPIInvites.send: must have whoId.", Logs.LEVEL_WARNING, whoId);
            return;
        }
        if (!whomId || typeof whomId != 'number') {
            Logs.log("SAPIInvites.send: must have whomId.", Logs.LEVEL_WARNING, whomId);
            return;
        }
        if (cntx.userId != whoId) {
            Logs.log("SAPIInvites.send: user can not send invite because whoId != currentUser.id.", Logs.LEVEL_WARNING);
            return;
        }
        if (!LogicUser.isUserOnline(whomId)) {
            Logs.log("SAPIInvites.send: whom must be online.", Logs.LEVEL_WARNING, {whoId: whoId, whomId: whomId});
            return;
        }
        /* @todo проверить, что это друг */
        CAPIInvites.receive(whomId, whoId, whomId);
    };
};
/**
 * Статичный класс.
 * @type {SAPIInvites}
 */
SAPIInvites = new SAPIInvites();
