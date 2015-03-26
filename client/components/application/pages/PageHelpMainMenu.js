/**
 * Страница шаблон.
 * @constructor
 */
PageHelpMainMenu = function PageHelpMainMenu() {
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

    this.init = function () {
        var element, line, list;
        var rowHeight = 115;
        var offsetY = 85;
        line = 0;
        list = [];
        list.push({name: ElementImage, x: 90, y: 74 + rowHeight * line + offsetY, src: '/images/radio/signRandomRest.png'});
        list.push({name: ElementImage, x: 185, y: 63 + rowHeight * line + offsetY, src: '/images/radio/signXRest.png'});
        list.push({name: ElementImage, x: 270, y: 62 + rowHeight * line + offsetY, src: '/images/radio/signORest.png'});
        list.push({name: ElementText, x: 390, y: 93 + rowHeight * line + offsetY, text: '&larr; выбор знака: любой, \r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;крестик или нолик.'});

        line = 1;
        list.push({name: ElementImage, x: 80, y: 60 + rowHeight * line + offsetY, src: '/images/radio/field3x3Rest.png'});
        list.push({name: ElementImage, x: 180, y: 75 + rowHeight * line + offsetY, src: '/images/radio/field15x15Rest.png'});
        list.push({name: ElementText, x: 390, y: 90 + rowHeight * line + offsetY, text: '&larr; выбор поля: 3х3 или 15х15.'});

        line = 2;
        list.push({name: ElementPhoto, x: 110, y: 60 + rowHeight * line + offsetY, width: 51, height: 50, user: {photo50: '/images/help/photoSomePeople1.png'}, pointer: GUI.POINTER_ARROW});
        list.push({name: ElementPhoto, x: 190, y: 60 + rowHeight * line + offsetY, width: 51, height: 51, user: {photo50: '/images/help/photoSomePeople2.png'}, pointer: GUI.POINTER_ARROW});
        list.push({name: ElementPhoto, x: 268, y: 60 + rowHeight * line + offsetY, width: 51, height: 51, user: {photo50: '/images/help/photoSomePeople3.png'}, pointer: GUI.POINTER_ARROW});
        list.push({name: ElementText, x: 360, y: 83 + rowHeight * line + offsetY, text: '&larr; отправить приглашение сыграть.'});

        line = 3;
        list.push({name: ElementImage, x: 110, y: 55 + rowHeight * line + offsetY, src: '/images/chat/chatLabel.png', opacity: 0.75});
        list.push({name: ElementText, x: 155, y: 68 + rowHeight * line + offsetY, width: 200, height: 20, text: '&larr; окно чата.'});
        list.push({name: ElementImage, x: 110, y: 120 + rowHeight * line + offsetY, src: '/images/chat/chatPrompt.png', opacity: 0.75});
        list.push({name: ElementText, x: 155, y: 118 + rowHeight * line + offsetY, text: '&larr; поле для оптравки сообщений в чат.'});

        for (var i in list) {
            element = GUI.createElement(list[i].name, list[i]);
            self.elements.push(element);
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
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        /* Возможны какие то обновления, до отрисовки. */
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
