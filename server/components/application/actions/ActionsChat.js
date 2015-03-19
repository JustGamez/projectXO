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
     * @param afterCompleteCallback {Function}
     */
    this.flushCache = function (retailSize, afterCompleteCallback) {
        var cacheSize, tmp, tmp2;
        log("FLush chat data begin.");
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
        if (tmp2.length == 0)return;
        DataChat.saveList(tmp2, function () {
            /* Удалим из кэша, то что мы слили в БД. */
            LogicChatCache.sliceCache(cacheSize - retailSize);
            Logs.log('Chat cache flushed. Count:' + tmp2.length);
            if (afterCompleteCallback) {
                afterCompleteCallback();
            }
        });
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

    this.deInit = function (deInitCallback) {
        self.flushCache(null, deInitCallback);
    };
};

/**
 * Константный класс.
 * @type {ActionsChat}
 */
ActionsChat = new ActionsChat();
