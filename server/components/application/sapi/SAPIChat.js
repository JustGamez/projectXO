SAPIChat = function () {

    /**
     * Запрос на создание игры.
     * @param cntx {Object} контекст соединения.
     * @param message {String} сообщение.
     */
    this.sendMessage = function (cntx, message) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIChat.sendMessage: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (message == undefined || typeof message != 'string') {
            Logs.log("SAPIChat.sendMessage: must have message with type string", Logs.LEVEL_WARNING, [message, typeof message]);
            return;
        }
        if (message.length > Config.Chat.messageLengthLimit) {
            Logs.log("SAPIChat.sendMessage length over limit.", Logs.LEVEL_WARNING, message);
            return;
        }
        ActionsChat.sendMessage(cntx.userId, message);
    };

    /**
     * Запрос последних сообщений
     * @param cntx {Object} контекст соединения.
     */
    this.sendMeLastMessages = function (cntx) {
        var list, messages;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIChat.sendMeLastMessages: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        list = LogicChatCache.getLastMessages(Config.Chat.lastMessagesCount);
        for (var i in list) {
            messages = list[i];
            CAPIChat.getNewMessage(cntx.userId, messages.userId, messages.text, messages.timestamp);
        }
    };
};
/**
 * Статичный класс.
 * @type {SAPIChat}
 */
SAPIChat = new SAPIChat();
