SAPIUser = function () {

    /**
     * Авторизация через ВК.
     * @param socNetUserId {int} id в социальной сети.
     * @param authParams {object} параметры аутентификации.
     */
    this.authorizeByVK = function (socNetUserId, authParams) {
        apiRouter.executeRequest('SAPIUser', 'authorizeByVK', arguments, [{connectionId: null}]);
    };

    /**
     * Отправяел информацию о пользователи в текущие соединение.
     * @param userId {int}
     */
    this.sendMeUserInfo = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeUserInfo', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос инфомрации о друзьях.
     * @param userId {int}
     */
    this.sendMeFriends = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeFriends', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос на отправку онлайн пользователей.
     */
    this.sendMeOnlineCount = function () {
        apiRouter.executeRequest('SAPIUser', 'sendMeOnlineCount', arguments, [{connectionId: null}]);
    };

    /**
     * Попросить отправить список userId онлайн юзеров.
     */
    this.sendMeOnlineUserIds = function () {
        apiRouter.executeRequest('SAPIUser', 'sendMeOnlineUserIds', arguments, [{connectionId: null}]);
    };

    this.sendMeRatingPosition = function(userId){
        apiRouter.executeRequest('SAPIUser', 'sendMeRatingPosition', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();