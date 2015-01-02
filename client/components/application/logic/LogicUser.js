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
     * Списки друзей.
     * @type {Array}
     */
    var friends = [];

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
        var friends = LogicUser.getFriendsById(userId);
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
            return users[userId];
        } else {
            this.loadUserInfoById(userId);
            return {
                id: null,
                score: null
            };
        }
    };

    /**
     * Запомним, чеё загрузки мы уже ждём, что бы не повторять лишних запросов.
     * @type {Array}
     */
    var waitForLoading = [];
    /**
     * Загрузить данные о пользователе.
     * @param userId {int}
     */
    this.loadUserInfoById = function (userId) {
        if (authorizedUserId == null)return;
        if (!waitForLoading[userId]) {
            waitForLoading[userId] = true;
            SAPIUser.sendMeUserInfo(userId);
        }
    };

    /**
     * Обновить данные о пользователе
     * @param user
     */
    this.updateUserInfo = function (user) {
        waitForLoading[user.id] = false;
        users[user.id] = user;
        pageController.redraw();
    };

    /**
     * Получить список друзей по внутренему id юзера
     * @param userId int внутрений id юзера.
     * @returns {*}
     */
    this.getFriendsById = function (userId) {
        if (friends[userId]) {
            return friends[userId];
        } else {
            this.loadFriendsById(userId);
            return null;
        }
    };

    /**
     * Загрузить данные о друзьях по внутренему ид
     * @param userId int внутрений id юзера.
     */
    this.loadFriendsById = function (userId) {
        SAPIUser.sendMeFriends(userId);
    };

    /**
     * Обновить данные о друзьях
     * @param userId внутрений id юзера.
     * @param friendList внутрение id друзей.
     */
    this.updateFriends = function (userId, friendList) {
        friends[userId] = friendList;
        Logs.log("LogicUser.udpateFriends for userId=" + userId, Logs.LEVEL_DETAIL);
    };

    /** Возвращает количество онлайн игроков. */
    this.getOnlineCount = function () {
        return onlineCount;
    };

    /**
     * Обновим данные о кол-во онлайн пользователей.
     * @param count кол-во онлайн пользователей.
     */
    this.updateOnlineCount = function (count) {
        onlineCount = count;
        pageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();