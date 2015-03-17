SAPIGame = function () {

    /**
     * Сделать ход в игре.
     * @param gameId {Number} id игры.
     * @param x {Number}
     * @param y {Number}
     */
    this.doMove = function (gameId, x, y) {
        apiRouter.executeRequest('SAPIGame', 'doMove', arguments, [{connectionId: null}]);
    };

    /**
     * Просим сервер проверить, есть ли победитель.
     * @param gameId {Number} id игры.
     */
    this.checkWinner = function (gameId) {
        apiRouter.executeRequest('SAPIGame', 'checkWinner', arguments, [{connectionId: null}]);
    };

    /* Закрыть игру с роботом.
     * @param gameId {Number}
     */
    this.close = function (gameId) {
        apiRouter.executeRequest('SAPIGame', 'close', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
