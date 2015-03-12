/**
 * Страница шаблон.
 * @constructor
 */
PageHelpRating = function PageHelpRating() {
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
        var rowHeight = 70;
        var offsetY = 150;

        var text1;
        text1 = '';
        text1 += 'За победу в игре игрок получает очки.\r\n';
        text1 += 'Рейтинговая позиция зависит от количества очков.\r\n';
        text1 += 'При одинаковом количестве очков, выше в рейтинге будет тот,\r\n';
        text1 += 'кому были начислены очки раньше.';

        line = 0;
        list = [];
        list.push({name: 'ElementText', x: 100, y: 40 + rowHeight * line + offsetY, text: text1});
        /*
         @todo
         line = 2;
         list.push({name:'ElementImage', x: 100 + 100, y : 35 + rowHeight * line + offsetY, src: '/images/buttons/rating{ByFriends}.png'});
         list.push({name:'ElementText', x: 250 + 100, y : 52 + rowHeight * line + offsetY, text: '&larr; рейтинг среди друзей.'});
         */

        /*
         @todo
         line = 3;
         list.push({name:'ElementImage', x: 100 + 100, y : 35 + rowHeight * line + offsetY, src: '/images/buttons/rating{ByMyPosition}.png'});
         list.push({name:'ElementText', x: 250 + 100, y : 52 + rowHeight * line + offsetY, text: '&larr;позиция в общем рейтинге.'});
         */

        line = 3;
        list.push({name: 'ElementImage', x: 100 + 100, y: 35 + rowHeight * line + offsetY, src: '/images/buttons/ratingRest.png'});
        list.push({name: 'ElementText', x: 250 + 100, y: 52 + rowHeight * line + offsetY, text: '&larr;позиции лучших игроков.'});

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
