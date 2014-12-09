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
        LogicUser.updateFriends(userId, friends);
    };
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();