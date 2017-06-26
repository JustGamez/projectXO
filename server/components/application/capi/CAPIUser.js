CAPIUser = function () {

    /**
     * Авторизация успешна
     * @param toUserId {Number} кому отправляем.
     * @param userId какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (toUserId, userId) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'authorizeSuccess', [userId]);
    };

    /**
     * Обновить данные о пользователи
     * @param toUserId {Number} кому отправляем.
     * @param user юзер инфо
     */
    this.updateUserInfo = function (toUserId, user) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'updateUserInfo', [user]);
    };

    /**
     * Обновление данныех о друзьях.
     * @param toUserId {Number} кому отправляем.
     * @param userId id int пользователя, чьи друзья
     * @param friends [] список друзей.
     * @deprecated
     */
    this.updateFriends = function (toUserId, userId, friends) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'updateFriends', [userId, friends]);
    };

    /**
     * Обновить кол-во онлайн пользователей.
     * @param toUserId {Number} кому отправляем.
     * @param count кол-во онлайн игроков.
     * @param userId {Number}
     * @param direction {Boolean} true - вошел в игру, false - вышел из игры.
     */
    this.updateOnlineCount = function (toUserId, count, userId, direction) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'updateOnlineCount', [count, userId, direction]);
    };

    /**
     * Обновить кол-во онлайн пользователей.
     * @param toUserId {Int} кому отправляем.
     * @param userId {Int} внутрений id итрока.
     * @param position {Int} позиция в рейтинге.
     */
    this.updateRatingPosition = function (toUserId, userId, position) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'updateRatingPosition', [userId, position]);
    };

    this.ratingChanged = function (toUserId) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'ratingChanged', []);
    };

    this.wallPostSended = function (toUserId, data) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'wallPostSended', [data]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();