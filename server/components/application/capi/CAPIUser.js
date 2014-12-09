CAPIUser = function () {
    /**
     * Авторизация успешна
     * @param toUserId кому отправляем.
     * @param userId какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (toUserId, userId) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'authorizeSuccess', [userId]);
    };
    /**
     * Обновить данные о пользователи
     * @param toUserId кому отправляем.
     * @param user юзер инфо
     */
    this.updateUserInfo = function (toUserId, user) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'updateUserInfo', [user]);
    };
    /**
     * Обновление данныех о друзьях.
     * @param toUserId c кому отправляем
     * @param userId id int пользователя, чьи друзья
     * @param friends [] список друзей.
     */
    this.updateFriends = function (toUserId, userId, friends) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'updateFriends', [userId, friends]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();