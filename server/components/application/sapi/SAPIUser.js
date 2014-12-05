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
};
/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();
