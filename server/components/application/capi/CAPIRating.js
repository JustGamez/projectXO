CAPIRating = function () {

    /**
     * Отправить клиенту рейтинг топ.
     * @param toUserId {Number} кому отправляем.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateTopList = function (toUserId, list) {
        LogicUser.sendToUser(toUserId, 'CAPIRating', 'updateTopList', [list]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIRating}
 */
CAPIRating = new CAPIRating();