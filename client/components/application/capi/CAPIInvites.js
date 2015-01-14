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

    /**
     * Оповещение о том, что игра создана.
     * @param cntx контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        if (!LogicGame.getCurrentGameId()) {
            LogicGame.setCurrentGameId(gameId);
            pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_XO_GAME]);
        } else {
            SAPIInvites.closeGame(gameId);
        }
    };
};

/**
 * Статичный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();