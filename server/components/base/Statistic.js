Statistic = function () {
    var self = this;

    var cache = [];

    var data = {};

    var lastId = 0;

    var maxTitleLength = 0;

    /**
     * @param userId int
     * @param statisticId int
     */
    this.add = function (userId, statisticId) {
        cache.push({
            userId: userId,
            timeStamp: new Date().getTime(),
            statisticId: statisticId
        });
    };

    this.init = function (afterInitCallback) {
        setInterval(self.checkCache, Config.Statistic.checkInterval);
        afterInitCallback();
    };

    this.checkCache = function () {
        if (cache.length > Config.Statistic.cacheLimit) {
            self.flushCache();
        }
    };

    this.flushCache = function () {
        var query, row;
        if (cache.length) {
            query = "INSERT INTO statistic ( userId, timeStamp, statisticId ) VALUES ";
            for (var i in cache) {
                row = cache[i];
                query += "(" + row.userId + "," + row.timeStamp + "," + row.statisticId + "),";
            }
            query = query.substr(0, query.length - 1);
            DB.query(query, function () {
                Logs.log("Statistic cache flushed.", Logs.LEVEL_DETAIL);
            });
            cache = [];
        }
    };

    this.getNewId = function (title) {
        var newId;
        if (!title) {
            title = '';
        }
        newId = ++lastId;
        data[newId] = {
            title: title
        };
        if (title.length > maxTitleLength) {
            maxTitleLength = title.length;
        }
        return newId;
    };
};

/**
 * Статичный класс.
 * @type {Statistic}
 */
Statistic = new Statistic();
