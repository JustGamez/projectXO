/**
 * @constructor
 */
SAPIRating = function () {

    /**
     * Запросить отправку топ-рейтинга.
     */
    this.sendMeTopList = function () {
        apiRouter.executeRequest('SAPIRating', 'sendMeTopList', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRating}
 */
SAPIRating = new SAPIRating();