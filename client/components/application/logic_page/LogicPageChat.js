LogicPageChat = function () {
    var self = this;

    this.chats = [];

    this.currentChat;

    /**
     * Что делаем, если введенно сообщение и отправлено.
     * @param message {String}
     */
    this.onChatInputEnterMessage = function (message) {
        if (message.length > 0) {
            SAPIChat.sendMessage(message, LogicPageChat.currentChat.withUserId);
        }
    };

    this.onChatDelete = function (id) {
        SAPIChat.blockThisMessage(id);
    };

    /**
     * Тут мы добавим кнопку чата, и установим её
     * Либо просто установим чат кнопки.
     * Если кнопок уже много, то закрываем ту из них, в которой сообщещние позже всего.
     * @param withUserId {int}
     */
    this.onNameClick = function (withUserId) {
        this.openDialogWithUser(withUserId);
    };

    this.openDialogWithUser = function (withUserId) {
        var targetChat;
        if (withUserId == LogicUser.getCurrentUser().id) return;
        /* Найдем первую свободную кнопку, если она есть конечно. */
        targetChat = null;
        self.chats.forEach(function (chat) {
            if (targetChat) return;
            if ((chat.withUserId == withUserId && chat.enabled == true ) || chat.enabled == false) {
                targetChat = chat;
            }
        });
        /* Если нет свободного, закроем тот в котором последние сообщение самое старое */
        if (!targetChat) {
            // @todo
        }
        targetChat.enabled = true;
        targetChat.withUserId = withUserId;
        self.currentChat = targetChat;
        pageController.redraw();
    };

    /**
     * Тут мы установим текущий чат.
     */
    this.onChatLabelClick = function () {
        if (this.chat === self.currentChat) {
            return;
        }
        self.currentChat = this.chat;
        pageController.redraw();
    };
};

LogicPageChat = new LogicPageChat;