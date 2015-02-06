/**
 * Страница бэкграудна.
 * @constructor
 */
PageBackground = function PageBackground() {
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
        /* Задний фон */
        element = GUI.createElement('ElementImage', {
            x: 0,
            y: 0,
            width: 788,
            height: 685,
            src: '/images/table.png'
        });
        self.elements.push(element);
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
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed)return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
