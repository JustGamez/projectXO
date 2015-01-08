CAPIUser = function () {

    /**
     * Авторизация успешна
     * @param cntx контекст соединения.
     * @param userId какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (cntx, userId) {
        LogicUser.authorizeSuccess(userId);
    };

    /**
     * Обновить данные о пользователи
     * @param cntx контекст соединения.
     * @param user юзер инфо
     */
    this.updateUserInfo = function (cntx, user) {
        LogicUser.updateUserInfo(user);
    };

    /**
     * Обновление данныех о друзьях.
     * @param cntx контекст соединения.
     * @param userId id int пользователя, чьи друзья
     * @param friends [] список друзей.
     */
    this.updateFriends = function (cntx, userId, friends) {
        LogicFriends.updateFriends(userId, friends);
    };

    /**
     * Обновляем кол-во о нлайн игроков.
     * @param cntx контекст соединения.
     * @param count кол-во онлайн игроков.
     * @param userId {Number}
     * @param direction {Boolean} true - вошел в игру, false - вышел из игры.
     */
    this.updateOnlineCount = function (cntx, count, userId, direction) {
        LogicUser.updateOnlineCount(count, userId, direction);
    }
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();