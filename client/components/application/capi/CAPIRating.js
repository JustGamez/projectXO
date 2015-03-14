CAPIRating = function () {

    /**
     * Отправить клиенту рейтинг топ.
     * @param cntx {Object} контекст соединения.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateTopList = function (cntx, list) {
        LogicRating.updateTopList(list);
    };

    /**
     * Отправить клиенту рейтинг топ.
     * @param cntx {Object} контекст соединения.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateRatingData = function (cntx, list) {
        LogicRating.updateRatingData(list);
    };

    this.updateLastPosition = function (cntx, lastPosition) {
        LogicRating.updateLastPosition(lastPosition);
    };
};

/**
 * Константный класс.
 * @type {CAPIRating}
 */
CAPIRating = new CAPIRating();