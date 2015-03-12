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
            onSendByEnter: LogicPageBackground.onChatInputEnterMessage
        });
        self.elements.push(element);
        self.elementChatInput = element;

        /* Лейбл чата. */
        element = GUI.createElement("ElementImage", {
            x: 58,
            y: 507,
            opacity: 0.28,
            src: '/images/chat/chatLabel.png'
        });
        self.elements.push(element);
        /* Промпт окно ввода сообщеий чата. */
        element = GUI.createElement("ElementImage", {
            x: 61,
            y: 601,
            opacity: 0.28,
            src: '/images/chat/chatPrompt.png'
        });
        self.elements.push(element);
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
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var messages;
        /* Кол-во сообщений для отображения */
        messages = LogicChatCache.getLastMessages(5);
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
