CAPIChat = function () {

    this.gotNewMessage = function (cntx, message) {
        message.timestamp = LogicTimeClient.convertToClient(message.timestamp);
        message.text = LogicChat.censureIt(message.text);
        LogicChat.addList([message]);
        if (isOpenedDialog(message)) {
            Sounds.play('/sounds/chatMessage.wav', 0.4);
        }
    };

    var isOpenedDialog = function (message) {
        var dialogOpened;
        dialogOpened = false;
        if (message.withUserId == LogicUser.getCurrentUser().id) dialogOpened = true;
        LogicPageChat.chats.forEach(function (chat) {
            if (chat.withUserId == message.withUserId) {
                dialogOpened = true;
            }
        });
        return dialogOpened;
    };

    this.gotMessages = function (cntx, messages) {
        messages.forEach(function (message, i) {
            messages[i].timestamp = LogicTimeClient.convertToClient(messages[i].timestamp);
            messages[i].text = LogicChat.censureIt(message.text);
            isOpenedDialog(message);
        });
        LogicChat.addList(messages);
    };

    this.updateMessageId = function (cntx, message) {
        message.text = LogicChat.censureIt(message.text);
        LogicChat.updateId(message);
    };

    this.updateMessage = function (cntx, message) {
        message.text = LogicChat.censureIt(message.text);
        LogicChat.update(message);
    };
};

/**
 * Константный класс.
 * @type {CAPIChat}
 */
CAPIChat = new CAPIChat();