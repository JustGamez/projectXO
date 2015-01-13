LogicFriends = function () {
    var self = this;

    /**
     * Массив id друзей.
     * @type {number []}
     */
    var friendIds = [];

    /**
     * Запомним, чьи загрузки мы уже ждём, что бы не повторять лишних запросов.
     * @type {Array}
     */
    var waitForLoadingUser = [];

    /**
     * Получить список друзей по внутренему id юзера
     * @param userId {Number} внутрений id юзера.
     * @returns {*}
     */
    this.getFriendsById = function (userId) {
        if (friendIds[userId]) {
            return friendIds[userId];
        } else {
            this.loadFriendsById(userId);
            return null;
        }
    };

    /**
     * Загрузить данные о друзьях по внутренему ид
     * @param userId {Number} внутрений id юзера.
     */
    this.loadFriendsById = function (userId) {
        if (!LogicUser.isAuthorized()) {
            return;
        }
        if (!waitForLoadingUser[userId]) {
            waitForLoadingUser[userId] = true;
            SAPIUser.sendMeFriends(userId);
        }
    };

    /**
     * Обновить данные о друзьях
     * @param userId {Number} внутрений id юзера.
     * @param friendList {Number} внутрение id друзей.
     */
    this.updateFriends = function (userId, friendList) {
        waitForLoadingUser[userId] = false;
        friendIds[userId] = friendList;
        pageController.redraw();
        Logs.log("LogicUser.udpateFriends for userId=" + userId, Logs.LEVEL_DETAIL);
    };
};

/**
 * Статичный класс.
 * @type {LogicFriends}
 */
LogicFriends = new LogicFriends();