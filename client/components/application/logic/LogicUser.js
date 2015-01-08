LogicUser = function () {
    var self = this;
    /**
     * Id пользователя под которым мы сидим.
     */
    var authorizedUserId = null;

    /**
     * Тут мы будем хранить данные пользователей.
     * @type {Array}
     */
    var users = [];

    /** Кол-во онлайн пользователей */
    var onlineCount = null;

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
        SAPIUser.sendMeOnlineCount();
        SAPIChat.sendMeLastMessages();
    };

    /**
     * Возвращает текущего(авторизованного пользователя).
     * @returns {null|Object}
     */
    this.getCurrentUser = function () {
        return this.getUserById(authorizedUserId);
    };

    /**
     * Получить данные пользователя по его id.
     * @param userId
     * @returns {null|Object}
     */
    this.getUserById = function (userId) {
        if (users[userId]) {
            /* Догрузим данные, это немного костыль... но время деньги :)*/
            if (!users[userId].socNetUserId) {
                self.loadUserInfoById(userId);
            }
            return users[userId];
        } else {
            self.loadUserInfoById(userId);
            return {
                id: null,
                score: null,
                firstName: '',
                lastName: ''
            };
        }
    };

    /**
     * Запомним, чьи загрузки мы уже ждём, что бы не повторять лишних запросов.
     * @type {Array}
     */
    var waitForLoadingUser = [];

    /**
     * Загрузить данные о пользователе.
     * @param userId {int}
     */
    this.loadUserInfoById = function (userId) {
        if (authorizedUserId == null)return;
        if (!waitForLoadingUser[userId]) {
            waitForLoadingUser[userId] = true;
            SAPIUser.sendMeUserInfo(userId);
        }
    };

    /**
     * Обновить данные о пользователе.
     * @param user {Object}
     */
    this.updateUserInfo = function (user) {
        waitForLoadingUser[user.id] = false;
        if (users[user.id] == undefined) {
            /* Заглушка */
            users[user.id] = {
                id: user.id,
                firstName: '',
                lastName: ''
            };
        }
        for (var paramName in user) {
            users[user.id][paramName] = user[paramName];
        }
        pageController.redraw();
    };

    /** Возвращает количество онлайн игроков. */
    this.getOnlineCount = function () {
        return onlineCount;
    };

    /**
     * Обновим данные о кол-во онлайн пользователей.
     * @param count кол-во онлайн пользователей.
     */
    this.updateOnlineCount = function (count, userId, direction) {
        onlineCount = count;
        self.updateUserInfo({id: userId, online: direction});
        pageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();