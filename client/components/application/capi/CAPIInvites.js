CAPIInvites = function () {

    /**
     * Получение приглашения.
     * @param cntx контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     * @param fieldTypeId {Number}
     * @param signId {Number}
     */
    this.receive = function (cntx, whoId, whomId, fieldTypeId, signId) {
        LogicInvites.save(whoId, whomId, fieldTypeId, signId);
        LogicTimers.start('letsplay_' + whoId, Config.Invites.letsPlaytimeout, LogicInvites.clearInviteByPare, [whoId, whomId, fieldTypeId, signId]);
        LogicPageBackground.showLetsPlayDialog();
    };
};

/**
 * Статичный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();