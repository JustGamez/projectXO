CAPIRating = function () {

    /**
     * Отправить клиенту рейтинг топ.
     * @param cntx {Object} контекст соединения.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateTopList = function (cntx, list) {
        /* Nothing to do. */
    };
};

/**
 * Константный класс.
 * @type {CAPIRating}
 */
CAPIRating = new CAPIRating();