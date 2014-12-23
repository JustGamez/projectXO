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
     * Оповестим, что игра создана.
     * @param cntx контекст соединения
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        /*@todo check is it game page?!*/
        if (LogicGame.getCurrentGameId()) {
            SAPIGame.closeGame(gameId);
        } else {
            LogicGame.setCurrentGameId(gameId);
        }
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();