/**
 * Страница чата.
 * @constructor
 */
PageChat = function PageChat() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Окно чата.
     * @type {ElementChatWindow}
     */
    this.elementChatWindow = null;

    /**
     * Элемент ввода сообщения чата.
     * @type {ElementChatInput}
     */
    this.elementChatInput = null;


    this.init = function () {
        var element;
        /* Окно чата. */
        element = GUI.createElement('ElementChatWindow', {
            x: 90,
            y: 500,
            width: 570,
            height: 92
        });
        self.elements.push(element);
        self.elementChatWindow = element;

        /* Форма ввода сообщения в чате.*/
        element = GUI.createElement('ElementChatInput', {
            x: 90,
            y: 607,
            width: 584,
            height: 20,
            onSendByEnter: LogicPageChat.onChatInputEnterMessage
        });
        self.elements.push(element);
        self.elementChatInput = element;

        /* Лейбл чата. */
        element = GUI.createElement("ElementImage", {
            x: 58,
            y: 491,
            opacity: 0.25,
            src: '/images/chat/chatLabel.png'
        });
        self.elements.push(element);
        /* Промпт окно ввода сообщеий чата. */
        element = GUI.createElement("ElementImage", {
            x: 61,
            y: 601,
            opacity: 0.25,
            src: '/images/chat/chatPrompt.png'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 100,
            y: 484,
            width: 100,
            height: 20,
            text: 'общий',
            fontSize: 12,
            bold: true,
            opacity: 0.4,
            pointer: GUI.POINTER_HAND,
            alignCenter: true,
            onClick: LogicPageChat.onChatLabelClick,
        });
        self.elements.push(element);
        /* По умолчанию нулевый чат, т.е. общий. */
        LogicPageChat.chats.push({button: element, withUserId: 0, enabled: true});
        LogicPageChat.currentChat = LogicPageChat.chats[0];
        element.chat = LogicPageChat.chats[0];
        /* Кнопки чата. */
        for (var i = 0; i < 4; i++) {
            element = GUI.createElement('ElementText', {
                x: 100 + (i + 1) * 100,
                y: 484,
                width: 100,
                height: 20,
                text: '-',
                fontSize: 12,
                bold: true,
                opacity: 0.4,
                pointer: GUI.POINTER_HAND,
                onClick: LogicPageChat.onChatLabelClick,
                withUserId: 0
            });
            LogicPageChat.chats.push({button: element, withUserId: 0, enabled: false});
            element.chat = LogicPageChat.chats[i + 1];
        }
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрачем все элементы на странице.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
        LogicPageChat.chats.forEach(function (chat) {
            chat.button.hide();
        });
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var messages, user, allDisabled;
        /* Кол-во сообщений для отображения */
        allDisabled = true;
        LogicPageChat.chats.forEach(function (chat, index) {
            if (chat.enabled) {
                /* 0 индекс у общего чата. */
                if (index > 0) {
                    allDisabled = false;
                }
                if (chat === LogicPageChat.currentChat) {
                    chat.button.bold = true;
                    chat.button.opacity = 0.6;
                } else {
                    chat.button.bold = false;
                    chat.button.opacity = 0.4;
                }
                /* The chat.withUserId== 0 - is it common chat. */
                if (chat.withUserId > 0) user = LogicUser.getById(chat.withUserId);
                if (user) {
                    chat.button.text = user.firstName + " " + user.lastName.charAt(0) + ".";
                }
                chat.button.show();
                chat.button.redraw();
            } else {
                chat.button.hide();
            }
        });
        if (allDisabled) {
            LogicPageChat.currentChat.button.hide();
        } else {
            LogicPageChat.currentChat.button.show();
        }
        messages = LogicChat.getMessages(0, 6, LogicPageChat.currentChat.withUserId);
        self.elementChatWindow.updateMessages(messages);
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
