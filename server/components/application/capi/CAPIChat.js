CAPIChat = function () {

    this.gotMessages = function (toUserId, messages) {
        LogicUser.sendToUser(toUserId, 'CAPIChat', 'gotMessages', [messages]);
    };

    this.gotNewMessage = function (toUserId, messages) {
        LogicUser.sendToUser(toUserId, 'CAPIChat', 'gotNewMessage', [messages]);
    };

    this.updateMessageId = function (toUserId, messages) {
        LogicUser.sendToUser(toUserId, 'CAPIChat', 'updateMessageId', [messages]);
    };

    this.updateMessage = function (toUserId, message) {
        LogicUser.sendToUser(toUserId, 'CAPIChat', 'updateMessage', [message]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIChat}
 */
CAPIChat = new CAPIChat();