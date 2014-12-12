SAPIUser = function () {
    /**
     *
     * @param cntx контекст соединения
     * @param socNetUserId id юзера в соц сети
     * @param authParams параметры аутентифиакации.
     */
    this.authorizeByVK = function (cntx, socNetUserId, authParams) {
        if (!socNetUserId) {
            Logs.log("SAPIUser.authorizeByVK: must have socNetUserId", Logs.LEVEL_WARNING);
            return;
        }
        if (!authParams || typeof authParams != 'object') {
            Logs.log("SAPIUser.authorizeByVK: must have authParams", Logs.LEVEL_WARNING);
            return;
        }
        LogicUser.authorizeByVK(socNetUserId, authParams, cntx);
    };
    /**
     * Отправяел информацию о пользователи в текущие соединение.
     * @param cntx object
     * @param userId number
     */
    this.sendMeUserInfo = function (cntx, userId) {
        if (!cntx.userId) {
            Logs.log("SAPIUser.sendMeUserInfo: not found cntx.userId", Logs.LEVEL_WARNING);
            return;
        }
        if (!userId || typeof userId != 'number') {
            Logs.log("SAPIUser.sendMeUserInfo: must have userId", Logs.LEVEL_WARNING);
            return;
        }
        LogicUser.sendUserInfo(userId, cntx);
    };
    /**
     * Запрос на отправку списка друзей.
     * @param cntx
     * @param userId
     */
    this.sendMeFriends = function (cntx, userId) {
        if (!cntx.userId) {
            Logs.log("SAPIUser.sendMeUserInfo: not found cntx.userId", Logs.LEVEL_WARNING);
            return;
        }
        if (!userId || typeof userId != 'number') {
            Logs.log("SAPIUser.sendMeFriends: must have userId", Logs.LEVEL_WARNING);
            return;
        }
        LogicUser.sendFriends(userId, cntx);
    };
    /**
     * Запрос на отправку онлайн пользователей.
     * @param cntx
     */
    this.sendMeOnlineCount = function (cntx) {
        if (!cntx.userId) {
            Logs.log("SAPIUser.sendMeOnlineCount: not found cntx.userId", Logs.LEVEL_WARNING);
            return;
        }
        LogicUser.sendOnlineCount(cntx);
    }
};
/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();
