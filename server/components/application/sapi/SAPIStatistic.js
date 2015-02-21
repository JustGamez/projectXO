SAPIStatistic = function () {

    this.openInviteFriendDialog = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIStatistic.openInviteFriendDialog: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Statistic.add(cntx.userId, Statistic.ID_CLIENT_OPEN_INVITE_FRIEND_DIALOG);
    };
};
/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();