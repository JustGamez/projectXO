SAPIGameLooks = function () {

    /**
     * Запрос начала просмотра игры.
     * @param gameId {String}
     */
    this.start = function (gameId) {
        apiRouter.executeRequest('SAPIGameLooks', 'start', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос окончания просмотра игры.
     */
    this.stop = function (gameId) {
        apiRouter.executeRequest('SAPIGameLooks', 'stop', arguments, [{connectionId: null}]);
    }
};

/**
 * Статичный класс.
 * @type {SAPIGameLooks}
 */
SAPIGameLooks = new SAPIGameLooks();