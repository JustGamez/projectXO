/**
 * Страница помощи.
 * @constructor
 */
PageHelp = function PageHelp() {
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
     *
     * @type {ElementRadio}
     */
    var elementRadio = null;

    this.init = function () {
        var element;
        /* Чекбоксы выбора под-страницы хелпа. */
        element = GUI.createElement(ElementRadio, {
            options: [
                {
                    x: 95,
                    y: 93,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_RULES,
                    title: ''
                },
                {
                    x: 95,
                    y: 118,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_MAIN_MENU,
                    title: ''

                },
                {
                    x: 95,
                    y: 143,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_RATING,
                    title: ''

                }
            ],
            currentIndex: LogicPageHelp.TAB_ID_MAIN_MENU,
            onChange: LogicPageHelp.onTabChanged
        });
        elementRadio = element;
        self.elements.push(element);
        element = GUI.createElement(ElementText, {
            x: 120,
            y: 95,
            width: 100,
            height: 25,
            text: 'Правила игры.',
            pointer: GUI.POINTER_HAND,
            onClick: function () {
                /* Это индекс(порядковый номер) опции при создании ElementRadio. */
                elementRadio.selectIndex(0);
            }
        });
        self.elements.push(element);
        element = GUI.createElement(ElementText, {
            x: 120,
            y: 120,
            width: 200,
            height: 20,
            text: 'Основное меню.',
            pointer: GUI.POINTER_HAND,
            onClick: function () {
                /* Это индекс(порядковый номер) опции при создании ElementRadio. */
                elementRadio.selectIndex(1);
            }
        });
        self.elements.push(element);
        element = GUI.createElement(ElementText, {
            x: 120,
            y: 145,
            width: 100,
            height: 20,
            text: 'Рейтинг',
            pointer: GUI.POINTER_HAND,
            onClick: function () {
                /* Это индекс(порядковый номер) опции при создании ElementRadio. */
                elementRadio.selectIndex(2);
            }
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
