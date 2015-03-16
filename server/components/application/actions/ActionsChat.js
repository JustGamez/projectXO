ActionsChat = function () {
    var self = this;

    /**
     * Получили сообщение от пользователя, отправим его всем онлайн пользователям.
     * @param userId {Number} id пользователя отправляющего сообщение.
     * @param text {String} Сообщение пользователя.
     */
    this.sendMessage = function (userId, text) {
        var timestamp, cacheSize;
        var prid = Profiler.start(Profiler.ID_CHAT_SEND_MESSAGE);
        timestamp = time();
        LogicChatCache.add(userId, text, timestamp, false);
        LogicUser.sendToAll(CAPIChat.getNewMessage, userId, text, timestamp);
        /* Сбросим кэш, если надо */
        cacheSize = LogicChatCache.getCacheSize();
        if (cacheSize >= Config.Chat.cacheSize) {
            self.flushCache(Config.Chat.lastMessagesCount);
        }
        Profiler.stop(Profiler.ID_CHAT_SEND_MESSAGE, prid);
    };

    /**
     * Сольём кэш чата.
     * @param retailSize {Number} сколько оставить в кэше.
     */
    this.flushCache = function (retailSize) {
        var cacheSize, tmp, tmp2;
        if (!retailSize) {
            retailSize = 0;
        }
        cacheSize = LogicChatCache.getCacheSize();
        /* Сохраним в БД кэш минус то что надо оставить. */
        tmp = LogicChatCache.getFirstMessages(cacheSize - retailSize);
        tmp2 = [];
        tmp.forEach(function (message) {
            if (!message.inDataBase) {
                tmp2.push(message);
            }
        });
        DataChat.saveList(tmp2);
        /* Удалим из кэша, то что мы слили в БД. */
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
        DataChat.getLastMessages(Config.Chat.lastMessagesCount, function (list) {
            list.forEach(function (message) {
                LogicChatCache.add(message.userId, message.text, message.timestamp, true);
            });
            Logs.log('Load last chat messages. Count:' + list.length, Logs.LEVEL_DETAIL);
            afterComplete();
        });
    };
};

/**
 * Константный класс.
 * @type {ActionsChat}
 */
ActionsChat = new ActionsChat();
