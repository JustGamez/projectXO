SAPIStatistic = function () {

    this.openInviteFriendDialog = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.openInviteFriendDialog: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLICK_INVITE_DIALOG);
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
        Statistic.add(cntx.userId, Statistic.ID_CLICK_RATING);
    };

    this.clickLookGameStart = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickLookGameStart: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_LOOK_GAME_START);
    };

    this.clickLookGameStop = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickLookGameStop: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_LOOK_GAME_STOP);
    };

    this.clickRatingTop = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickRatingTop: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLICK_RATING_TOP);
    };

    this.clickRatingMy = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickRatingMy: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLICK_RATING_MY);
    };

    this.clickRatingUp = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickRatingUp: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLICK_RATING_UP);
    };

    this.clickRatingDown = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.clickRatingDown: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLICK_RATING_DOWN);
    };
};
/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();