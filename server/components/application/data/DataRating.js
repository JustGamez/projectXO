DataRating = function () {
    var self = this;

    /**
     * Имя таблицы рейтинга.
     * @type {string}
     */
    var tableName = 'rating';

    var lastPosition = null;

    /**
     * Добавит запись в таблице рейтинга.
     * Добавление произойдет в конец таблицы, с последней позицией, очков:0, дата последнего обновления текущая.
     * @param userId {int} внутрений id пользователя.
     * @param callback {Function}
     */
    this.addPosition = function (userId, callback) {
        self.getLastPosition(function (lastPosition) {
            var updated;
            updated = new Date().getTime();
            DB.insert(tableName, {
                userId: userId,
                score: 0,
                position: lastPosition + 1,
                updated: updated
            }, function () {
                Logs.log("DataRating.addPosition. new position added.userId" + userId + ", score{*}:0, position:" + lastPosition + ", updated:" + updated);
                lastPosition = null;
                self.flushLastPosition();
                self.getLastPosition(callback);
            });
        });
    };

    this.flushLastPosition = function () {
        lastPosition = null;
    };

    /**
     * Вернёт последнию позицию {int}.
     * @param callback {Function}
     */
    this.getLastPosition = function (callback) {
        if (lastPosition) {
            callback(lastPosition);
        } else {
            self.updateLastPosition(function () {
                callback(lastPosition);
            });
        }
    };

    this.updateLastPosition = function (callback) {
        var query;
        query = "SELECT MAX(position) as lastPosition FROM " + tableName;
        DB.query(query, function (rows) {
            if (!rows[0].lastPosition) {
                lastPosition = 0;
            } else {
                lastPosition = rows[0].lastPosition;
            }
            callback();
        });
    };

    this.getListByPositions = function (positionList, callback) {
        var query;
        query = "SELECT * FROM " + tableName + " WHERE position IN (" + positionList.join(',') + ")";
        DB.query(query, function (rows) {
            callback(rows);
        });
    };

    this.init = function (afterInitCallback) {
        self.updateLastPosition(afterInitCallback);
    };
};

/**
 * Статичный класс.
 * @type {DataRating}
 */
DataRating = new DataRating();