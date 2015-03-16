SAPIGame = function () {

    /**
     * Запрос на присоединение\создание игры.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*.
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*.
     */
    this.requestRandomGame = function (fieldTypeId, signId) {
        apiRouter.executeRequest('SAPIGame', 'requestRandomGame', arguments, [{connectionId: null}]);
    };

    /**
     * Сообщим серверу, что мы больше не ждем игры.
     */
    this.cancelRandomGameRequests = function () {
        apiRouter.executeRequest('SAPIGame', 'cancelRandomGameRequests', arguments, [{connectionId: null}]);
    };

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