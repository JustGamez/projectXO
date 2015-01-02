ActionsChat = function () {
    var self = this;

    /**
     * Получили сообщение от пользователя, отправим его всем онлайн пользователям.
     * @param userId {Number} id пользователя отправляющего сообщение.
     * @param text {String} Сообщение пользователя.
     */
    this.sendMessage = function (userId, text) {
        var timestamp;
        Logs.log("ActionsXO.sendMessage", Logs.LEVEL_DETAIL);
        timestamp = Math.floor(new Date() / 1000);
        LogicChatCache.add(userId, text, timestamp);
        LogicUser.sendToAll(CAPIChat.getNewMessage, userId, text, timestamp);
        /* Сброси кэш, если надо */
        var cacheSize;
        cacheSize = LogicChatCache.getCacheSize();
        if (cacheSize > Config.Chat.cacheSize) {
            DataChat.saveList(LogicChatCache.getLastMessages(cacheSize));
            LogicChatCache.sliceCache(Config.Chat.lastMessagesCount);
        }
    };

    /**
     * Загрузим из БД последние сообщения, при запуске системы нужно что то отправлять пользователям.
     * Что бы чат небыло пустым.
     */
    this.init = function (afterInitCallback) {
        loadLastMessages(afterInitCallback);
    };

    /**
     * Загрузим последние сообщения. Согласно конфигу Config.Chat.lastMessageCount.
     * @param afterComplete
     */
    var loadLastMessages = function (afterComplete) {
        var message;
        DataChat.getLastMessages(Config.Chat.lastMessagesCount, function (list) {
            for (var i in list) {
                message = list[i];
                LogicChatCache.add(message.userId, message.text, message.timestamp);
            }
            Logs.log('Load last chat messages. Count:' + list.length, Logs.LEVEL_NOTIFY);
            afterComplete();
        });
    };
};

/**
 * Константный класс.
 * @type {ActionsChat}
 */
ActionsChat = new ActionsChat();