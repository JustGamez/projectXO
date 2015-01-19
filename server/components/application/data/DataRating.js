DataRating = function () {
    var self = this;

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
     * Добавит запись в таблице рейтинга.
     * Добавление произойдет в конец таблицы, с последней позицией, очков:0, дата последнего обновления текущая.
     * @param userId {int} внутрений id пользователя.
     */
    this.addPosition = function (userId) {
        self.getLastPosition(function (lastPosition) {
            var updated;
            updated = new Date().getTime();
            DB.insert(tableName, {
                userId: userId,
                score: 0,
                position: lastPosition + 1,
                updated: updated
            }, function () {
                Logs.log("DataRating.addPosition. new position added.userId" + userId + ", score:0, position:" + lastPosition + ", updated:" + updated);
            });
        });
    };

    /**
     * Вернёт последнию позицию {int}.
     * @param callback {Function}
     */
    this.getLastPosition = function (callback) {
        var query;
        query = "SELECT MAX(position) as lastPosition FROM " + tableName;
        DB.query(query, function (rows) {
            var lastPosition;
            if (!rows[0].lastPosition) {
                lastPosition = 0;
            } else {
                lastPosition = rows[0].lastPosition;
            }
            callback(lastPosition);
        });
    };

    /**
     * Вернуть рейтинг топ.
     * @param callback [Function]
     */
    this.getTopList = function (callback) {
        var query;
        query = "SELECT * FROM " + tableName + " ORDER BY position ASC LIMIT " + Config.Rating.TopLimitSize;
        DB.query(query, callback);
    };
};

/**
 * Статичный класс.
 * @type {DataRating}
 */
DataRating = new DataRating();