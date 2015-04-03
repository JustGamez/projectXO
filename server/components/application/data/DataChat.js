DataChat = function () {

    /**
     * Имя таблицы сообщений чата.
     * @type {string}
     */
    var tableName = 'chat_messages';

    var cache = [];

    var fields = {
        id: null,
        userId: null,
        text: null,
        timestamp: null
    };

    this.add = function (message, callback) {
        var query;
        query = "INSERT " + tableName + " (userId, text, timestamp, withUserId) VALUES ";
        query += "(";
        query += DB.escape(message.userId) + ",";
        query += DB.escape(message.text) + ",";
        query += DB.escape(message.timestamp) + ",";
        query += DB.escape(message.withUserId);
        query += ")";
        DB.query(query, function (result) {
            message.id = result.insertId;
            cache[message.id] = message;
            callback(message);
        });
    };

    this.save = function (message, callback) {
        var query;
        query = "UPDATE " + tableName + " SET ";
        query += "`userId` = " + DB.escape(message.userId) + ",";
        query += "`text` = " + DB.escape(message.text) + ",";
        query += "`timestamp` = " + DB.escape(message.timestamp) + ",";
        query += "`blocked` = " + DB.escape(message.blocked) + ",";
        query += "`withUserId` = " + DB.escape(message.withUserId);
        query += " WHERE id = " + DB.escape(message.id);
        DB.query(query, function (result) {
            cache[message.id] = message;
            callback(message);
        });
    };

    /**
     * Вернуть последние сообщения из бд.
     * @param limit
     * @param afterId
     * @param withUserId
     * @param callback {function}
     */
    this.getLastMessages = function (limit, afterId, withUserId, callback) {
        var query;
        if (!withUserId) {
            var tmp = cache.slice(0);
            // сортируем по id
            tmp.sort(function (a, b) {
                if (a.id < b.id)return 1;
                if (a.id > b.id)return -1;
                return 0;
            });
            tmp.sort(function (a, b) {
                if (a.timestamp < b.timestamp)return 1;
                if (a.timestamp > b.timestamp)return -1;
                return 0;
            });
            var tmp2;
            tmp2 = [];
            if (afterId) {
                tmp.forEach(function (row) {
                    if (row.blocked) return;
                    if (row.id < afterId) {
                        tmp2.push(row);
                    }
                });
                tmp = tmp2;
            }
            tmp = tmp.slice(0, limit);
            if (tmp.length >= limit) {
                callback(tmp);
                return;
            }
        }
        if (afterId) {
            query = "SELECT * FROM " + tableName + " WHERE id < " + DB.escape(afterId);
        } else {
            query = "SELECT * FROM " + tableName + " WHERE 1 ";
        }
        if (withUserId) {
            query += " AND withUserId = " + DB.escape(withUserId);
        }
        query += " ORDER BY id DESC LIMIT " + limit;
        DB.query(query, function (rows) {
            rows.forEach(function (row) {
                cache[row.id] = row;
            });
            callback(rows);
        });
    };

    this.getById = function (id, callback) {
        var query;
        if (cache[id]) {
            callback(cache[id]);
            return;
        }
        query = "SELECT * FROM chat_messages WHERE id = " + DB.escape(id);
        DB.query(query, function (rows) {
            if (!rows[0]) {
                Logs.log("DataChat.getById. message not found", Logs.LEVEL_WARNING, id);
                return;
            }
            callback(rows[0]);
        });
    };
};

/**
 * Статичный класс.
 * @type {DataChat}
 */
DataChat = new DataChat();
