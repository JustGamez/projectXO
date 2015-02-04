CAPIUser = function () {

    /**
     * Авторизация успешна.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (cntx, userId) {
        Logs.log('authorize success');
        LogicKrispiRobot.onAuthorizationSuccess(userId);
    };

    /**
     * Обновить данные о пользователи.
     * @param cntx {Object} контекст соединения.
     * @param user {Object} юзер инфо.
     */
    this.updateUserInfo = function (cntx, user) {
        /* Nothing to do. */
    };

    /**
     * Обновление данныех о друзьях.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} id int пользователя, чьи друзья
     * @param friends {Number[]} список друзей.
     */
    this.updateFriends = function (cntx, userId, friends) {
        /* Nothing to do. */
    };

    /**
     * Обновляем кол-во о нлайн игроков.
     * @param cntx {Object} контекст соединения.
     * @param count {Number} кол-во онлайн игроков.
     * @param userId {Number} внутрений id пользователя.
     * @param direction {Boolean} true - вошел в игру, false - вышел из игры.
     */
    this.updateOnlineCount = function (cntx, count, userId, direction) {
        /* Nothing to do. */
    }
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();