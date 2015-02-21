SAPIStatistic = function () {

    this.openInviteFriendDialog = function () {
        apiRouter.executeRequest('SAPIStatistic', 'openInviteFriendDialog', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();