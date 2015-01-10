SAPIRobotGame = function () {

    /**
     * Создание игры с роботом
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.startGame = function (fieldTypeId, signId) {
        apiRouter.executeRequest('SAPIRobotGame', 'startGame', arguments, [{connectionId: null}]);
    };

    /**
     * Сделать ход в игре.
     * @param gameId {Number} id игры
     * @param x {Number}
     * @param y {Number}
     * @param checkWinner {Boolean}
     */
    this.doMove = function (gameId, x, y, checkWinner) {
        apiRouter.executeRequest('SAPIRobotGame', 'doMove', arguments, [{connectionId: null}]);
    };

    /**
     * Просим сервер проверить, есть ли победитель.
     * @param gameId {Number} id игры.
     */
    this.checkWinner = function (gameId) {
        apiRouter.executeRequest('SAPIRobotGame', 'checkWinner', arguments, [{connectionId: null}]);
    };

    /**
     * Закрыть игру с роботом.
     * @param gameId {Number}
     */
    this.closeGame = function (gameId) {
        apiRouter.executeRequest('SAPIRobotGame', 'closeGame', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRobotGame}
 */
SAPIRobotGame = new SAPIRobotGame();
