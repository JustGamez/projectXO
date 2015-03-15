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

    var elementSound;

    this.init = function () {
        var element;
        /* Задний фон */
        element = GUI.createElement('ElementImage', {
            x: 0,
            y: 0,
            src: '/images/table.png'
        });
        self.elements.push(element);
        element = GUI.createElement("ElementFlag", {
            x: 665,
            y: 55,
            srcRest: '/images/buttons/soundOff.png',
            srcHover: '/images/buttons/soundOff.png',
            srcActive: '/images/buttons/soundHover.png',
            defaultState: true,
            onChange: function (newValue) {
                if (newValue) {
                    Sounds.on();
                } else {
                    Sounds.off();
                }
                pageController.redraw();
            }
        });
        elementSound = element;
        self.elements.push(element);
        /* Кнопка `(?)` */
        element = GUI.createElement('ElementButton', {
                x: 700,
                y: 54,
                srcRest: '/images/help/buttons/helpRest.png',
                srcHover: '/images/help/buttons/helpHover.png',
                srcActive: '/images/help/buttons/helpActive.png',
                onClick: LogicPageMain.onButtonHelpClick
            }
        );
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
        if (Sounds.enabled) {
            elementSound.opacity = 1.0;
        } else {
            elementSound.opacity = 0.3;
        }
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
