CAPIInvites = function () {

    /**
     * Получение приглашения.
     * @param cntx контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.receive = function (cntx, whoId, whomId) {
        LogicInvites.save(whoId, whomId);
        LogicTimers.start('letsplay_' + whoId, Config.Invites.letsPlaytimeout, LogicInvites.clearInviteByPare, [whoId, whomId]);
    };

    /**
     * Оповещение о том, что игра создана.
     * @param cntx контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        var newGame, currentGameId, xoPageShowedNow;
        newGame = LogicGame.getGameById(gameId);
        currentGameId = LogicGame.getCurrentGameId();
        xoPageShowedNow = pageController.isShowedNow(PageController.PAGE_ID_XO_GAME);
        if (
            (!currentGameId)
            ||
            (currentGameId && xoPageShowedNow && (currentGameId == newGame.copyFromId || currentGameId == newGame.id) && LogicGame.getCurrentGame().status != LogicXO.STATUS_RUN)
        ) {
            pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
            SAPIUserState.isBusy();
            SAPIUserState.onGame(gameId);
            LogicGame.setCurrentGameId(gameId);
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