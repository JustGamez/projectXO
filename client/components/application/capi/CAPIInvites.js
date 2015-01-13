CAPIInvites = function () {

    /**
     * Получение приглашения.
     * @param cntx контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.receive = function (cntx, whoId, whomId) {
        LogicInvites.save(whoId, whomId);
        LogicTimers.start('letsplay_' + whoId, Config.Invites.letsPlaytimeout, LogicInvites.clearInvite, [whoId, whomId]);
    };
};

/**
 * Статичный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();