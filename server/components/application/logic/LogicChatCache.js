/**
 * Логика кэша чата.
 * @constructor
 */
LogicChatCache = function () {

    var cache = [];

    /**
     * Добавить сообщение в кэш.
     * @param userId {number}
     * @param text {string}
     * @param timestamp {number}
     */
    this.add = function (userId, text, timestamp) {
        var message;
        message = {
            userId: userId,
            text: text,
            timestamp: timestamp
        };
        cache.push(message);
    };

    /**
     * Взять последние сообщения.
     * @param count {number}
     */
    this.getLastMessages = function (count) {
        return cache.slice(-count);
    };

    /**
     * Возвращает текущий размер кэша.
     * @returns {Number}
     */
    this.getCacheSize = function () {
        return cache.length;
    };

    /**
     * Убрезать кэш, оставим последние собщения.
     * @param size {number}
     */
    this.sliceCache = function (size) {
        cache = cache.slice(-size);
    };
};

/**
 * Статитечский класс.
 * @type {LogicChatCache}
 */
LogicChatCache = new LogicChatCache();