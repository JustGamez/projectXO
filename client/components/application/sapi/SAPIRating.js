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

    /**
     * Запросить рейтинговые данные для указанных позиций.
     */
    this.sendMeRatingForPositions = function (positions) {
        apiRouter.executeRequest('SAPIRating', 'sendMeRatingForPositions', arguments, [{connectionId: null}]);
    };

    this.sendMeLastPosition = function () {
        apiRouter.executeRequest('SAPIRating', 'sendMeLastPosition', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRating}
 */
SAPIRating = new SAPIRating();