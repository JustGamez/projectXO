CAPIUser = function () {

    /**
     * Авторизация успешна
     * @param toUserId кому отправляем.
     * @param userId какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (cntx, userId) {
        LogicUser.authorizeSuccess(userId);
    };

    /**
     * Обновить данные о пользователи
     * @param toUserId кому отправляем.
     * @param user юзер инфо
     */
    this.updateUserInfo = function (cntx, user) {
        LogicUser.updateUserInfo(user);
    }
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();