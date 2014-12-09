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
     * @param userId number
     */
    this.sendMeUserInfo = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeUserInfo', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос инфомрации о друзьях
     * @param userId number
     */
    this.sendMeFriends = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeFriends', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();