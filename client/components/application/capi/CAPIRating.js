CAPIRating = function () {

    /**
     * Отправить клиенту рейтинг топ.
     * @param cntx {Object} контекст соединения.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateTopList = function (cntx, list) {
        LogicRating.updateTopList(list);
    };
};

/**
 * Константный класс.
 * @type {CAPIRating}
 */
CAPIRating = new CAPIRating();