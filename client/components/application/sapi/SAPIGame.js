SAPIGame = function () {

    /**
     * Запрос на присоединение\создание игры.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.requestRandomGame = function (fieldTypeId, signId) {
        apiRouter.executeRequest('SAPIGame', 'requestRandomGame', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();