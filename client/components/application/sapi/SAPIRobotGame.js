SAPIRobotGame = function () {

    /**
     * Создание игры с роботом
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.createGame = function (fieldTypeId, signId) {
        apiRouter.executeRequest('SAPIRobotGame', 'createGame', arguments, [{connectionId: null}]);
    };

    /**
     * Закрыть игру с роботом.
     * @param gameId {Number}
     */
    this.close = function (gameId) {
        apiRouter.executeRequest('SAPIRobotGame', 'close', arguments, [{connectionId: null}]);
    };

    /**
     * Просим робота сделать ход.
     * @param gameId {Number}
     */
    this.raiseAIMove = function (gameId) {
        apiRouter.executeRequest('SAPIRobotGame', 'raiseAIMove', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRobotGame}
 */
SAPIRobotGame = new SAPIRobotGame();
