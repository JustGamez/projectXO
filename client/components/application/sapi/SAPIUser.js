SAPIUser = function () {

    /**
     *
     * @param socNetUserId id в социальной сети.
     * @param authParams параметры аутентификации.
     */
    this.authorizeByVK = function (socNetUserId, authParams) {
        apiRouter.executeRequest('SAPIUser', 'authorizeByVK', arguments, [{connectionId: null}]);
    };

    /**
     * Отправяел информацию о пользователи в текущие соединение.
     * @param cntx
     * @param userId
     */
    this.sendMeUserInfo = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeUserInfo', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();