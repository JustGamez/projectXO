SAPIChat = function () {

    /**
     * Запрос на создание игры.
     * @param cntx {Object} контекст соединения.
     * @param text {String} сообщение.
     * @param withUserId {int}
     */
    this.sendMessage = function (cntx, text, withUserId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIChat.sendMessage: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (text == undefined || typeof text != 'string') {
            Logs.log("SAPIChat.sendMessage: must have message with type string", Logs.LEVEL_WARNING, [text, typeof text]);
            return;
        }
        if (text.length > Config.Chat.messageLengthLimit) {
            Logs.log("SAPIChat.sendMessage length over limit.", Logs.LEVEL_WARNING, text);
            return;
        }
        var prid = Profiler.start(Profiler.ID_CHAT_SEND_MESSAGE);
        Statistic.add(cntx.userId, Statistic.ID_CHAT_SEND_MESSAGE);
        var message = {
            id: 0,
            userId: cntx.userId,
            timestamp: time(),
            text: text,
            withUserId: withUserId
        };
        DataChat.add(message, function (message) {
            LogicUser.sendToAll(CAPIChat.updateMessageId, message);
            Profiler.stop(Profiler.ID_CHAT_SEND_MESSAGE, prid);
        });
        LogicUser.sendToAll(CAPIChat.gotNewMessage, message);
    };

    /**
     * Запрос id последних сообщений.
     * @param cntx {Object} контекст соединения.
     */
    this.sendMeLastMessages = function (cntx) {
        var out;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIChat.sendMeLastMessages: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        var prid = Profiler.start(Profiler.ID_GET_LAST_MESSAGES);
        DataChat.getLastMessages(Config.Chat.lastMessagesCount, undefined, 0, function (messages) {
            CAPIChat.gotMessages(cntx.userId, messages);
            Profiler.stop(Profiler.ID_GET_LAST_MESSAGES, prid);
        });
    };

    this.blockThisMessage = function (cntx, id) {
        var isAdmin;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIChat.blockThisMessage: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        Config.admin.ids.forEach(function (id) {
            if (id == cntx.userId) isAdmin = true;
        });
        if (!isAdmin) {
            Logs.log("SAPIChat.blockThisMessage: must be userId == 1", Logs.LEVEL_WARNING, cntx.userId);
            return;
        }
        DataChat.getById(id, function (message) {
            message.blocked = true;
            DataChat.save(message, function () {
                LogicUser.sendToAll(CAPIChat.updateMessage, message);
            });
        });
    };

    this.sendMeMessagesBeforeId = function (cntx, id, withUserId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIChat.sendMeMessagesBeforeId: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (withUserId < 0 || typeof withUserId != 'number') {
            Logs.log("SAPIChat.sendMeMessagesBeforeId: chatId be with type number", Logs.LEVEL_WARNING, withUserId);
            return;
        }
        var prid = Profiler.start(Profiler.ID_CHAT_SEND_BEFORE_ID);
        DataChat.getLastMessages(Config.Chat.lastMessagesCount, id, withUserId, function (messages) {
            CAPIChat.gotMessages(cntx.userId, messages);
            Profiler.stop(Profiler.ID_CHAT_SEND_BEFORE_ID, prid);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIChat}
 */
SAPIChat = new SAPIChat();
