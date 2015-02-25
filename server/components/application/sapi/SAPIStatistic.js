SAPIStatistic = function () {

    this.openInviteFriendDialog = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.openInviteFriendDialog: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLIENT_OPEN_INVITE_FRIEND_DIALOG);
    };

    this.clickHelp = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickHelp: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLICK_HELP);
    };

    this.onRatingButtonClick = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.onRatingButtonClick: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_ON_RATING_BUTTON_CLICK);
    };
};
/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();