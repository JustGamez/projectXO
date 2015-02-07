DataChat = function () {

    /**
     * Имя таблицы сообщений чата.
     * @type {string}
     */
    var tableName = 'chat_messages';

    var fields = {
        id: null,
        userId: null,
        text: null,
        timestamp: null
    };

    /**
     * Вернуть последние сообщения из бд.
     * @param callback
     */
    this.getLastMessages = function (limit, callback) {
        var query;
        query = "SELECT * FROM " + tableName + " ORDER BY id DESC LIMIT " + limit;
        DB.query(query, callback);
    };

    this.saveList = function (list) {
        var query, message;
        query = "INSERT INTO " + tableName + " ";
        query += "(`userId`,`text`,`timestamp`) VALUES";
        for (var i in list) {
            message = list[i];
            query += "(";
            query += DB.escape(message.userId) + ",";
            query += DB.escape(message.text) + ",";
            query += DB.escape(message.timestamp) + "";
            query += "),";
        }
        /* Уберём последнию запятую */
        query = query.substr(0, query.length - 1);
        DB.query(query, new Function());
    };
};

/**
 * Статичный класс.
 * @type {DataChat}
 */
DataChat = new DataChat();