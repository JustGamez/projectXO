/**
 * Страница шаблон.
 * @constructor
 */
PageHelpRules = function PageHelpRules() {
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
        var rowHeight = 137;
        var offsetY = 170;

        var text1;
        text1 = '';
        text1 += 'Игроки по очереди ставят на свободные клетки знаки.\r\n';
        text1 += 'Первый ход делает игрок, играющий крестиком.\r\n';
        text1 += 'Победителем считается тот, кто первым выстроит свои знаки\r\n в ряд: ';
        text1 += 'по горизонтали, вертикали или диагонали.';

        list = [];
        line = 0;
        list.push({name: 'ElementText', x: 100, y: 15 + rowHeight * line + offsetY, text: text1});
        line = 1;
        list.push({name: 'ElementText', x: 100, y: 0 + rowHeight * line + offsetY, text: 'Для поля 3х3 нужно выстроить 3 знака в ряд, например:'});
        list.push({name: 'ElementImage', x: 110, y: 40 + rowHeight * line + offsetY, src: '/images/help/screen3x3Vertical.png'});
        list.push({name: 'ElementImage', x: 220, y: 40 + rowHeight * line + offsetY, src: '/images/help/screen3x3Horizontal.png'});
        list.push({name: 'ElementImage', x: 330, y: 40 + rowHeight * line + offsetY, src: '/images/help/screen3x3Diagonal.png'});

        line = 2;
        list.push({name: 'ElementText', x: 100, y: 0 + rowHeight * line + offsetY, text: 'Для поля 15х15 нужно выстроить 5 знаков в ряд, например:'});
        list.push({name: 'ElementImage', x: 110, y: 40 + 3 + rowHeight * line + offsetY, src: '/images/help/screen15x15Vertical.png'});
        list.push({name: 'ElementImage', x: 220, y: 40 + 3 + rowHeight * line + offsetY, src: '/images/help/screen15x15Horizontal.png'});
        list.push({name: 'ElementImage', x: 330, y: 40 + 3 + rowHeight * line + offsetY, src: '/images/help/screen15x15Diagonal.png'});

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
