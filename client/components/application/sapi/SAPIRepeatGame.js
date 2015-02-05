/**
 * @constructor
 */
SAPIRepeatGame = function () {

    /**
     * Запрос на повтор игры.
     * @param gameId {int}
     */
    this.repeat = function (gameId) {
        apiRouter.executeRequest('SAPIRepeatGame', 'repeat', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRepeatGame}
 */
SAPIRepeatGame = new SAPIRepeatGame();