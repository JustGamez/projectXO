LogicPageChat = function () {
    var self = this;

    this.chats = [];

    this.currentChat;

    /**
     * ��� ������, ���� �������� ��������� � ����������.
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
     * ��� �� ������� ������ ����, � ��������� �
     * ���� ������ ��������� ��� ������.
     * ���� ������ ��� �����, �� ��������� �� �� ���, � ������� ���������� ����� �����.
     * @param withUserId {int}
     */
    this.onNameClick = function (withUserId) {
        this.openDialogWithUser(withUserId);
    };

    this.openDialogWithUser = function (withUserId) {
        var targetChat;
        if (withUserId == LogicUser.getCurrentUser().id) return;
        /* ������ ������ ��������� ������, ���� ��� ���� �������. */
        targetChat = null;
        self.chats.forEach(function (chat) {
            if (targetChat) return;
            if ((chat.withUserId == withUserId && chat.enabled == true ) || chat.enabled == false) {
                targetChat = chat;
            }
        });
        /* ���� ��� ����������, ������� ��� � ������� ��������� ��������� ����� ������ */
        if (!targetChat) {
            // @todo
        }
        targetChat.enabled = true;
        targetChat.withUserId = withUserId;
        self.currentChat = targetChat;
        PageController.redraw();
    };

    /**
     * ��� �� ��������� ������� ���.
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