CAPIGame = function () {

    /**
     * Обновить данные об игре.
     * @param cntx {Object} контекст соединения.
     * @param game {Object} данные об игре.
     */
    this.updateInfo = function (cntx, game) {
        /* Nothing to do */
        DataGames.update(game);
    };

    /**
     * Оповещение, что игра создана.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        /* Nothing to do */
    };

    /**
     * Робот сделал ход.
     * После хода робота, проверим есть ли победитель, ну или, либо ничья.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры, в которой бот сделал ход.
     */
    this.robotDoMove = function (cntx, gameId) {
        /* Nothing to do */
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();