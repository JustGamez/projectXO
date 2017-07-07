LogicPageChat = function () {
    var self = this;

    this.chats = [];

    this.currentChat = undefined;

    /**
     * @param message {String}
     */
    this.onChatInputEnterMessage = function (message) {
        if (message.length > 0) {
            SAPIChat.sendMessage(message, LogicPageChat.currentChat.withUserId);
        }
    };

    this.onChatBlock = function (id) {
        SAPIChat.blockThisMessage(id);
    };

    /**
     * @param withUserId {int}
     */
    this.onNameClick = function (withUserId) {
        this.openDialogWithUser(withUserId);
    };

    /**
     * Open(show) dialog with requested user id
     * @param withUserId internal user id
     */
    this.openDialogWithUser = function (withUserId) {
        var targetChat;
        if (withUserId === LogicUser.getCurrentUser().id) return;
        self.chats.forEach(function (chat) {
            if (self.currentChat.withUserId === withUserId) return;
            if (chat.withUserId === withUserId && chat.enabled === true) { // if dialog already opened
                self.currentChat = chat;
            } else if (chat.enabled === false) {                              // or open new dialog
                chat.enabled = true;
                chat.withUserId = withUserId;
                self.currentChat = chat;
            }
        });
        if (self.currentChat.withUserId !== withUserId) {
            // disable(close) one dialog, and then open again for requested userId
            self.chats[1].enabled = false;
            self.openDialogWithUser(withUserId);
            return;
        }
        PageController.redraw();
    };

    /**
     * Actions on click chat label.
     */
    this.onChatLabelClick = function () {
        if (this.chat === self.currentChat) {
            return;
        }
        self.currentChat = this.chat;
        PageController.redraw();
    };
};

LogicPageChat = new LogicPageChat;