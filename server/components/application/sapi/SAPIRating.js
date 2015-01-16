SAPIRating = function () {

    /**
     * Запрос на отправку рейтинга топа.
     * @param cntx {Object} контекст соединения.
     */
    this.sendMeTopList = function (cntx) {
        var list;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRating.sendMeTopList: must be authorized.", Logs.LEVEL_WARNING);
            return;
        }
        DataRating.getTopList(function (rows) {
            CAPIRating.updateTopList(cntx.userId, rows);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIRating}
 */
SAPIRating = new SAPIRating();
