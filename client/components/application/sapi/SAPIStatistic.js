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
};

/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();