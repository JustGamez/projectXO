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
        timestamp = Math.floor(new Date().getTime() / 1000);
        LogicChatCache.add(userId, text, timestamp, false);
        LogicUser.sendToAll(CAPIChat.getNewMessage, userId, text, timestamp);
        /* Сбросим кэш, если надо */
        cacheSize = LogicChatCache.getCacheSize();
        Logs.log("ActionsChat.sendMessage. CacheSize=" + cacheSize, Logs.LEVEL_DETAIL);
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
        var cacheSize;
        if (!retailSize) {
            retailSize = 0;
        }
        cacheSize = LogicChatCache.getCacheSize();
        /* Сохраним в БД кэш минус то что надо оставить. */
        var tmp = LogicChatCache.getFirstMessages(cacheSize - retailSize);
        var tmp2 = [];
        for (var i in tmp) {
            if (tmp[i].inDataBase) {
                continue;
            }
            tmp2.push(tmp[i]);
        }
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
        var message;
        DataChat.getLastMessages(Config.Chat.lastMessagesCount, function (list) {
            for (var i in list) {
                message = list[i];
                LogicChatCache.add(message.userId, message.text, message.timestamp, true);
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