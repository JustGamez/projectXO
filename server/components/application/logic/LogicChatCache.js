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
     * @param inDataBase {bool}
     */
    this.add = function (userId, text, timestamp, inDataBase) {
        var message;
        message = {
            userId: userId,
            text: text,
            timestamp: timestamp,
            inDataBase: inDataBase
        };
        cache.push(message);
    };

    /**
     * Вернёт последнии сообщения.
     * Сообщения будут отсортированы по времени.
     * @param count {number} кол-во сообщений.
     * @returns {Array} массив сообщений.
     */
    this.getLastMessages = function (count) {
        var messages;
        messages = cache.slice(-count);
        messages.sort(function (a, b) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return +1;
            return 0;
        });
        messages.sort(function (a, b) {
            if (a.timestamp < b.timestamp) return -1;
            if (a.timestamp > b.timestamp) return +1;
            return 0;
        });

        return messages;
    };

    /**
     * Вернёт первые сообщения.
     * @param count {number} кол-во сообщений.
     * @returns {Array} массив сообщений.
     */
    this.getFirstMessages = function (count) {
        return cache.slice(0, count);
    };

    /**
     * Возвращает текущий размер кэша.
     * @returns {Number} кол-во сообщений в кэше.
     */
    this.getCacheSize = function () {
        return cache.length;
    };

    /**
     * Обрежет кэш, оставим последние собщения.
     * @param size {number} кол-во сообщний на конце, которые останутся.
     */
    this.sliceCache = function (size) {
        cache = cache.slice(size, cache.length);
    };
};

/**
 * Статитечский класс.
 * @type {LogicChatCache}
 */
LogicChatCache = new LogicChatCache();