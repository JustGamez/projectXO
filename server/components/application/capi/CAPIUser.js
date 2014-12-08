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
    }
};

/**
 * Констатный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();