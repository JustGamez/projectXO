/**
 * Основная страница игры.
 * @constructor
 */
PageMain = function PageMain() {
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
     * Создадим тут все элементы страницы.
     */
    this.init = function () {
        var element;
        /* Кнопка играть. */
        element = GUI.createElement('ElementButton', {
            x: 269,
            y: 225,
            width: 225,
            height: 93,
            srcRest: '/images/buttons/playRest.png',
            srcHover: '/images/buttons/playHover.png',
            srcActive: '/images/buttons/playActive.png',
            onClick: LogicPageMain.onPlayButtonClick
        });
        self.elements.push(element);
        /* Выбор игры с роботом или без*/
        element = GUI.createElement("ElementFlag", {
            x: 132,
            y: 170,
            height: 83,
            width: 142,
            srcRest: '/images/flags/vsRobotRest.png',
            srcHover: '/images/flags/vsRobotHover.png',
            srcActive: '/images/flags/vsRobotActive.png',
            defaultState: false,
            onChange: LogicPageMain.onFlagVsRobotChange
        });
        self.elements.push(element);
        /* Выбор типа поля игры */
        element = GUI.createElement("ElementRadio", {
            options: [
                {
                    srcRest: '/images/radio/field15x15Rest.png',
                    srcHover: '/images/radio/field15x15Hover.png',
                    srcActive: '/images/radio/field15x15Active.png',
                    x: 550,
                    y: 100,
                    width: 156,
                    height: 85,
                    title: 'поле 15 на 15, \r\nпобеждает линия \r\nиз 5-ти знаков.',
                    value: LogicXO.FIELD_TYPE_15X15
                },
                {
                    srcRest: '/images/radio/field3x3Rest.png',
                    srcHover: '/images/radio/field3x3Hover.png',
                    srcActive: '/images/radio/field3x3Active.png',
                    x: 550,
                    y: 185,
                    width: 123,
                    height: 86,
                    title: 'поле 3 на 3, \r\nпобеждает линия \r\nиз 3-ёх знаков.',
                    value: LogicXO.FIELD_TYPE_3X3
                }
            ],
            currentIndex: 0,
            onChange: LogicPageMain.onRadioFieldTypeChange
        });
        self.elements.push(element);
        /* Выбор знака игры */
        element = GUI.createElement("ElementRadio", {
            options: [
                {
                    srcRest: '/images/radio/signRandomRest.png.png',
                    srcHover: '/images/radio/signRandomHover.png',
                    srcActive: '/images/radio/signRandomActive.png',
                    x: 120,
                    y: 90,
                    width: 148,
                    height: 70,
                    value: LogicXO.SIGN_ID_Empty
                },
                {
                    srcRest: '/images/radio/signXRest.png',
                    srcHover: '/images/radio/signXHover.png',
                    srcActive: '/images/radio/signXActive.png',
                    x: 146,
                    y: 102,
                    width: 146,
                    height: 102,
                    value: LogicXO.SIGN_ID_X
                },
                {
                    srcRest: '/images/radio/signORest.png',
                    srcHover: '/images/radio/signOHover.png',
                    srcActive: '/images/radio/signOActive.png',
                    x: 375,
                    y: 80,
                    width: 146,
                    height: 102,
                    value: LogicXO.SIGN_ID_O
                }
            ],
            currentIndex: 0,
            onChange: LogicPageMain.onRadioSignChange
        });
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
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
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed)return;
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
