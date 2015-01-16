/**
 * Логика рейтинга.
 * @constructor
 */
LogicRating = function () {

    /**
     * Рейтинг топа.
     * @type {{userId: number, score: number, position: number}[]}
     */
    var ratingTop = [];

    /**
     * Ждём ли мы загрузик топа.
     * Это, что бы не выполнять по 100 запросов за раз.
     * @type {boolean}
     */
    var ratingTopWaiting = false;

    /**
     * Вернуть топ-рейтинг.
     */
    this.getTopList = function () {
        if (!ratingTopWaiting) {
            LogicTimers.start('load', 1000, SAPIRating.sendMeTopList);
            ratingTopWaiting = true;
        }
        return ratingTop;
    };

    /**
     * Обновить рейтинг топа.
     * @param list {{userId: number, score: number, position: number}[]}
     */
    this.updateTopList = function (list) {
        ratingTopWaiting = false;
        ratingTop = list;
        pageController.redraw();
    };
};

/**
 * Константный класс.
 * @type {LogicRating}
 */
LogicRating = new LogicRating();