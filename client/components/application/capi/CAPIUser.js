CAPIUser = function () {

    /**
     * Авторизация успешна.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (cntx, userId) {
        LogicUser.authorizeSuccess(userId);
    };

    /**
     * Обновить данные о пользователи.
     * @param cntx {Object} контекст соединения.
     * @param user {Object} юзер инфо.
     */
    this.updateUserInfo = function (cntx, user) {
        LogicUser.updateUserInfo(user);
    };

    /**
     * Обновление данныех о друзьях.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} id int пользователя, чьи друзья
     * @param friends {Number[]} список друзей.
     */
    this.updateFriends = function (cntx, userId, friends) {
        LogicFriends.updateFriends(userId, friends);
    };

    /**
     * Обновляем кол-во о нлайн игроков.
     * @param cntx {Object} контекст соединения.
     * @param count {Number} кол-во онлайн игроков.
     * @param userId {Number} внутрений id пользователя.
     * @param direction {Boolean} true - вошел в игру, false - вышел из игры.
     */
    this.updateOnlineCount = function (cntx, count, userId, direction) {
        LogicUser.updateOnlineCount(count, userId, direction);
    };

    /**
     * @param cntx {Object} контекст соединения.
     * @param userId {Int} внутрений id итрока.
     * @param position {Int} позиция в рейтинге.
     */
    this.updateRatingPosition = function (cntx, userId, position) {
        LogicUser.updateRatingPosition(userId, position);
    };

    this.ratingChanged = function (cntx) {
        LogicUser.setRatingPositionsNeedReload();
        LogicRating.onRatingUpdated();
    };

    this.wallPostSended = function (cntx, vkResponse) {
        LogicDrawWallPost.onUploadComplete(vkResponse);
    };
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();