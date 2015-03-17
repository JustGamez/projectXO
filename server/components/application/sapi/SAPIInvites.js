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
        var prid = Profiler.start(Profiler.ID_SEND_INVITE);
        Statistic.add(cntx.userId, Statistic.ID_INVITATION_SEND);
        CAPIInvites.receive(whomId, whoId, whomId);
        Profiler.stop(Profiler.ID_SEND_INVITE, prid);
    };

    /**
     * Создание игры по приглашению.
     * @param cntx {Object} контекст соединения.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*.
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*.
     * @param withUserId {Number} внутрений id юзера с которым создаём игру.
     */
    this.createGame = function (cntx, fieldTypeId, signId, withUserId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIInvites.createGame: must be authorized.", Logs.LEVEL_WARNING);
            return;
        }
        if (!fieldTypeId || !(fieldTypeId == LogicXO.FIELD_TYPE_3X3 || fieldTypeId == LogicXO.FIELD_TYPE_15X15)) {
            Logs.log("SAPIInvites.createGame: must have fieldTypeId", Logs.LEVEL_WARNING, fieldTypeId);
            return;
        }
        if (!signId || !(signId == LogicXO.SIGN_ID_X || signId == LogicXO.SIGN_ID_O || signId == LogicXO.SIGN_ID_Empty)) {
            Logs.log("SAPIInvites.createGame: must have signId", Logs.LEVEL_WARNING, signId);
            return;
        }
        if (!withUserId || typeof withUserId != 'number') {
            Logs.log("SAPIInvites.createGame: must have withUserId", Logs.LEVEL_WARNING, withUserId);
            return;
        }
        if (!LogicUser.isUserOnline(withUserId)) {
            Logs.log("SAPIInvites.createGame: withUserId must be online", Logs.LEVEL_WARNING, withUserId);
            return;
        }
        /* @todo проверка занят\не занят */
        /* @todo проверка на друга */
        Statistic.add(cntx.userId, Statistic.ID_CREATE_GAME_INVATION);
        ActionsInvites.createGame(fieldTypeId, signId, cntx.userId, withUserId, function (game) {
            CAPIGame.updateInfo(game.creatorUserId, game);
            CAPIGame.updateInfo(game.joinerUserId, game);
            CAPIGame.gameCreated(game.creatorUserId, game.id);
            CAPIGame.gameCreated(game.joinerUserId, game.id);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIInvites}
 */
SAPIInvites = new SAPIInvites();
