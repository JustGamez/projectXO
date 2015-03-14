CAPIRating = function () {

    /**
     * Отправить клиенту рейтинг топ.
     * @param toUserId {Number} кому отправляем.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateTopList = function (toUserId, list) {
        LogicUser.sendToUser(toUserId, 'CAPIRating', 'updateTopList', [list]);
    };

    /**
     * Отправить клиенту рейтинг топ.
     * @param toUserId {Number} кому отправляем.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateRatingData = function (toUserId, list) {
        LogicUser.sendToUser(toUserId, 'CAPIRating', 'updateRatingData', [list]);
    };

    this.updateLastPosition = function (toUserId, lastPosition) {
        LogicUser.sendToUser(toUserId, 'CAPIRating', 'updateLastPosition', [lastPosition]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIRating}
 */
CAPIRating = new CAPIRating();