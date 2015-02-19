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
        Statistic.add(cntx.userId, Statistic.ID_RATING_GET_TOP);
        Profiler.start(Profiler.ID_SAPIRATING_SEND_ME_TOP_LIST);
        DataRating.getTopList(function (rows) {
            CAPIRating.updateTopList(cntx.userId, rows);
            Profiler.stop(Profiler.ID_SAPIRATING_SEND_ME_TOP_LIST);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIRating}
 */
SAPIRating = new SAPIRating();
