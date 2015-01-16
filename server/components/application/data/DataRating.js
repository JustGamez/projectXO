DataRating = function () {

    /**
     * Имя таблицы рейтинга.
     * @type {string}
     */
    var tableName = 'rating';

    /**
     * Поля.
     * @type {{userId: number, score: number, position: number, updated: number}}
     */
    var fields = {
        userId: 5,
        score: null,
        position: null,
        updated: null
    };

    /**
     * Вернуть рейтинг топ.
     * @param callback [Function]
     */
    this.getTopList = function (callback) {
        var query;
        query = "SELECT * FROM " + tableName + " ORDER BY position DESC LIMIT " + Config.Rating.TopLimitSize;
        DB.query(query, callback);
    };
};

/**
 * Статичный класс.
 * @type {DataRating}
 */
DataRating = new DataRating();