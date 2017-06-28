CAPIChat = function () {

    this.gotNewMessage = function (cntx, message) {
        message.timestamp = LogicTimeClient.convertToClient(message.timestamp, true);
        message.text = LogicChat.censureIt(message.text);
        LogicChat.addList([message]);
        checkIsOpened(message);
        //@todo only if is it current chat
        Sounds.play('/sounds/chatMessage.wav', 0.4);
    };

    var checkIsOpened = function (message) {
        var dialogOpened;
        /* @Todo */
        return;
        if (message.blocked) return;
        if (message.userId != LogicUser.getCurrentUser().id) return;
        dialogOpened = false;
        LogicPageChat.chats.forEach(function (chat) {
            if (chat.withUserId == message.withUserId) {
                dialogOpened = true;
            }
        });
        if (dialogOpened == false) {
            LogicPageChat.openDialogWithUser(message.withUserId);
        }
    };

    this.gotMessages = function (cntx, messages) {
        messages.forEach(function (message, i) {
            messages[i].timestamp = LogicTimeClient.convertToClient(messages[i].timestamp, true);
            messages[i].text = LogicChat.censureIt(message.text);
            checkIsOpened(message);
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