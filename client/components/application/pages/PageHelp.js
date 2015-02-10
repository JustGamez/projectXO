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

    this.init = function () {
        var element;
        /* Тут создаются элементы страницы. */
        /* Кнопка `(?)` */
        element = GUI.createElement('ElementButton', {
            x: 686,
            y: 64,
            width: 48,
            height: 42,
            srcRest: '/images/help/buttons/closeRest.png',
            srcHover: '/images/help/buttons/closeHover.png',
            srcActive: '/images/help/buttons/closeActive.png',
            onClick: LogicPageHelp.onButtonCloseClick
        });
        self.elements.push(element);
        /* Чекбоксы выбора под-страницы хелпа. */
        element = GUI.createElement('ElementRadio', {
            options: [
                {
                    x: 95,
                    y: 83,
                    width: 28,
                    height: 28,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_RULES,
                    title: ''
                },
                {
                    x: 95,
                    y: 108,
                    width: 28,
                    height: 28,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_MAIN_MENU,
                    title: ''

                },
                {
                    x: 95,
                    y: 133,
                    width: 28,
                    height: 28,
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
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 120,
            y: 85,
            width: 100,
            height: 20,
            text: 'Правила игры.'
            /* onClick: function(){ LogicPageHelp.onLabelClick( LogicPageHelp.TAB_ID_RULES)} */
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 120,
            y: 110,
            width: 200,
            height: 20,
            text: 'Основное меню.'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 120,
            y: 135,
            width: 100,
            height: 20,
            text: 'Рейтинг'
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
