CAPIInvites = function () {

    /**
     * Получение приглашения.
     * @param cntx контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     * @param fieldTypeId {Number} look LogicXO.FIELD_TYPE_*
     * @param signId {Number}
     */
    this.receive = function (cntx, whoId, whomId, fieldTypeId, signId) {
        LogicInvites.save(whoId, whomId, fieldTypeId, signId);
        LogicTimers.start('letsplay_' + whoId, Config.Invites.letsPlaytimeout, LogicInvites.clearInviteByPare, [whoId, whomId, fieldTypeId, signId]);
        LogicPageBackground.showLetsPlayDialog();
        Sounds.play('/sounds/invite2.wav', 0.12);
    };
};

/**
 * Статичный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();