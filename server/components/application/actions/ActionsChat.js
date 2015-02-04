ActionsChat = function () {
    var self = this;

    /**
     * Получили сообщение от пользователя, отправим его всем онлайн пользователям.
     * @param userId {Number} id пользователя отправляющего сообщение.
     * @param text {String} Сообщение пользователя.
     */
    this.sendMessage = function (userId, text) {
        var timestamp;
        Profiler.start(Profiler.ID_SAPICHAT_SEND_MESSAGE);
        timestamp = Math.floor(new Date() / 1000);
        LogicChatCache.add(userId, text, timestamp);
        LogicUser.sendToAll(CAPIChat.getNewMessage, userId, text, timestamp);
        /* Сбросим кэш, если надо */
        var cacheSize;
        cacheSize = LogicChatCache.getCacheSize();
        Logs.log("ActionsChat.sendMessage. CacheSize=" + cacheSize, Logs.LEVEL_DETAIL);
        if (cacheSize >= Config.Chat.cacheSize) {
            self.flushCache(Config.Chat.lastMessagesCount);
        }
        Profiler.stop(Profiler.ID_SAPICHAT_SEND_MESSAGE);
    };

    /**
     * Сольём кэш чата.
     * @param retailSize {Number} сколько оставить в кэше.
     */
    this.flushCache = function (retailSize) {
        var cacheSize;
        if (!retailSize) {
            retailSize = 0;
        }
        cacheSize = LogicChatCache.getCacheSize();
        DataChat.saveList(LogicChatCache.getFirstMessages(cacheSize - retailSize));
        LogicChatCache.sliceCache(cacheSize - retailSize);
        Logs.log('Chat cache flushed.');
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