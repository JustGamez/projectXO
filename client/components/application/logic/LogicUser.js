LogicUser = function () {

    /**
     * Id пользователя под которым мы сидим.
     */
    var authorizedUserId = null;
    /**
     * Тут мы будем хранить данные пользователей.
     * @type {Array}
     */
    var users = [];
    /**
     * Авторизация пользователя.
     */
    this.authorize = function () {
        var socNetUserId, authParams;
        socNetUserId = SocNet.getSocNetUseId();
        authParams = SocNet.getAuthParams();
        SAPIUser.authorizeByVK(socNetUserId, authParams);
    };

    /**
     * Метод для обработки ответа от сервера об успешной авторизации.
     * @param userId
     */
    this.authorizeSuccess = function (userId) {
        authorizedUserId = userId;
        Logs.log("Authorization success. userId:" + userId, Logs.LEVEL_NOTIFY);

        var user = LogicUser.getUserById(userId);
    };

    /**
     * Загрузить данные о пользователе.
     * @param useId
     */
    this.loadUserInfo = function (userId) {
        SAPIUser.sendMeUserInfo(userId);
    };

    /**
     * Обновить данные о пользователе
     * @param user
     */
    this.updateUserInfo = function (user) {
        users[user.id] = user;
    };

    /**
     * Получить данные пользователя по его id.
     * @param userId
     * @returns {*}
     */
    this.getUserById = function (userId) {
        if (users[userId]) {
            return users[userId];
        } else {
            this.loadUserInfo(userId);
            return null;
        }
    }
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();