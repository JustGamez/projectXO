/**
 * Логика чата. т.ч. хранение сообщений, тоже тут.
 * @constructor
 */
LogicChat = function () {
    var self = this;

    this.getMessages = function () {
        var messages, timestamp;
        messages = [];
        timestamp = Date.now();
        messages.push({
            userId: 1,
            text: 'Тестовое сообщение 1.',
            timestamp: timestamp,
            timeHours: new Date(timestamp).getHours(),
            timeMinutes: new Date(timestamp).getMinutes()
        });
        messages.push({
            userId: 2,
            text: 'Тестовое сообщение 2.',
            timestamp: timestamp,
            timeHours: new Date(timestamp).getHours(),
            timeMinutes: new Date(timestamp).getMinutes()
        });
        return messages;
    };
};

/**
 * Статичный класс.
 * @type {LogicChat}
 */
LogicChat = new LogicChat();