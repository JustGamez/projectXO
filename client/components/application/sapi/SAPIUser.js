SAPIUser = function () {

    /**
     * Авторизация через ВК.
     * @param socNetUserId {Number} id в социальной сети.
     * @param authParams {Object} параметры аутентификации.
     */
    this.authorizeByVK = function (socNetUserId, authParams) {
        apiRouter.executeRequest('SAPIUser', 'authorizeByVK', arguments, [{connectionId: null}]);
    };

    /**
     * Отправяел информацию о пользователи в текущие соединение.
     * @param userId {Number}
     */
    this.sendMeUserInfo = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeUserInfo', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос инфомрации о друзьях
     * @param userId {Number}
     */
    this.sendMeFriends = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeFriends', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос на отправку онлайн пользователей.
     */
    this.sendMeOnlineCount = function () {
        apiRouter.executeRequest('SAPIUser', 'sendMeOnlineCount', arguments, [{connectionId: null}]);
    }
};

/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();