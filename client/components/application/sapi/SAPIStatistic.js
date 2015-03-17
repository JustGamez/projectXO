SAPIStatistic = function () {

    this.openInviteFriendDialog = function () {
        apiRouter.executeRequest('SAPIStatistic', 'openInviteFriendDialog', arguments, [{connectionId: null}]);
    };

    this.clickHelp = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickHelp', arguments, [{connectionId: null}]);
    };

    this.onRatingButtonClick = function () {
        apiRouter.executeRequest('SAPIStatistic', 'onRatingButtonClick', arguments, [{connectionId: null}]);
    };

    this.clickLookGameStart = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickLookGameStart', arguments, [{connectionId: null}]);
    };

    this.clickLookGameStop = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickLookGameStop', arguments, [{connectionId: null}]);
    };

    this.clickRatingTop = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickRatingTop', arguments, [{connectionId: null}]);
    };

    this.clickRatingMy = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickRatingMy', arguments, [{connectionId: null}]);
    };

    this.clickRatingUp = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickRatingUp', arguments, [{connectionId: null}]);
    };

    this.clickRatingDown = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickRatingDown', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();