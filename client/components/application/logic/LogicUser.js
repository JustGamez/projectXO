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
        console.log(friends);
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
            this.loadUserInfoById(userId);
            return null;
        }
    };
    /**
     * Загрузить данные о пользователе.
     * @param useId int
     */
    this.loadUserInfoById = function (userId) {
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
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();