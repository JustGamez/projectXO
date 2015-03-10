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
        score15x15vsPerson: null,
        score3x3vsPerson: null,
        score15x15vsRobot: null,
        score3x3vsRobot: null,
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
                score15x15vsPerson: 0,
                score3x3vsPerson: 0,
                score15x15vsRobot: 0,
                score3x3vsRobot: 0,
                position: lastPosition + 1,
                updated: updated
            }, function () {
                Logs.log("DataRating.addPosition. new position added.userId" + userId + ", score{*}:0, position:" + lastPosition + ", updated:" + updated);
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

    var cacheTopList;
    var cacheTopListLastPoint = 0;
    /**
     * Вернуть рейтинг топ.
     * @param callback [Function]
     */
    this.getTopList = function (callback) {
        var query;
        if (cacheTopList && (new Date().getTime() - cacheTopListLastPoint < 5000)) {
            callback(cacheTopList);
            return;
        }
        query = "SELECT * FROM " + tableName + " ORDER BY position ASC LIMIT " + Config.Rating.TopLimitSize;
        DB.query(query, function (rows) {
            cacheTopList = rows;
            cacheTopListLastPoint = new Date().getTime();
            callback(cacheTopList);
        });
    };
};

/**
 * Статичный класс.
 * @type {DataRating}
 */
DataRating = new DataRating();