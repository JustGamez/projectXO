CAPIGame = function () {

    /**
     * Обновить данные об игре
     * @param cntx контекст соединения
     * @param game данные об игре.
     */
    this.updateInfo = function (cntx, game) {
        LogicGame.updateInfo(game);
    };

    /**
     * Оповещение, что игра создана.
     * @param cntx контекст соединения
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        /*@todo check is it game page?!*/
        if (!LogicGame.getCurrentGameId() && pageController.isShowedNow(PageController.PAGE_ID_XO_GAME)) {
            LogicGame.setCurrentGameId(gameId);
        } else {
            SAPIGame.closeGame(gameId);
        }
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();