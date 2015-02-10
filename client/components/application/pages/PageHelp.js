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
                    srcHove: '/images/help/checkboxArrowHover.png',
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
                    srcHove: '/images/help/checkboxArrowHover.png',
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
                    srcHove: '/images/help/checkboxArrowHover.png',
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
        initMainMenuTab();
    };

    var initMainMenuTab = function () {
        var element, line;
        var rowHeight = 90;
        var offsetY = 85;
        line = 0;
        list = [];
        list.push({name: 'ElementImage', x: 90, y: 74 + rowHeight * line + offsetY, src: '/images/radio/signRandomRest.png'});
        list.push({name: 'ElementImage', x: 185, y: 63 + rowHeight * line + offsetY, src: '/images/radio/signXRest.png'});
        list.push({name: 'ElementImage', x: 270, y: 62 + rowHeight * line + offsetY, src: '/images/radio/signORest.png'});
        list.push({name: 'ElementText', x: 390, y: 93 + rowHeight * line + offsetY, src: '/images/radio/signORest.png', width: 200, height: 20, text: '&larr; выбор знака: любой, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;крестик или нолик.'});

        line = 1;
        list.push({name: 'ElementImage', x: 80, y: 60 + rowHeight * line + offsetY, src: '/images/radio/field3x3Rest.png'});
        list.push({name: 'ElementImage', x: 180, y: 75 + rowHeight * line + offsetY, src: '/images/radio/field15x15Rest.png'});
        list.push({name: 'ElementText', x: 390, y: 90 + rowHeight * line + offsetY, src: '/images/radio/signORest.png', width: 200, height: 20, text: '&larr; выбор поля: 3х3 или 15х15.'});

        line = 2;
        list.push({name: 'ElementImage', x: 116 + 145, y: 55 + rowHeight * line + offsetY, src: '/images/flags/vsRobotRest.png'});
        list.push({name: 'ElementText', x: 390, y: 80 + rowHeight * line + offsetY, text: '&larr; играть с компьютером.'});

        line = 3;
        list.push({name: 'ElementImage', x: 110, y: 60 + rowHeight * line + offsetY, width: 50, height: 50, src: '/images/help/photoSomePeople1.png'});
        list.push({name: 'ElementImage', x: 190, y: 60 + rowHeight * line + offsetY, width: 50, height: 50, src: '/images/help/photoSomePeople2.png'});
        list.push({name: 'ElementImage', x: 268, y: 60 + rowHeight * line + offsetY, width: 50, height: 50, src: '/images/help/photoSomePeople3.png'});
        list.push({name: 'ElementText', x: 360, y: 83 + rowHeight * line + offsetY, text: '&larr; отправить приглашение сыграть.'});

        line = 4;
        list.push({name: 'ElementImage', x: 110, y: 55 + rowHeight * line + offsetY, width: 50, height: 50, src: '/images/help/imageChatLabel.png', opacity: 0.75});
        list.push({name: 'ElementText', x: 155, y: 68 + rowHeight * line + offsetY, width: 200, height: 20, text: '&larr; окно чата.'});
        list.push({name: 'ElementImage', x: 110, y: 120 + rowHeight * line + offsetY, width: 50, height: 50, src: '/images/help/imageChatPrompt.png', opacity: 0.75});
        list.push({name: 'ElementText', x: 155, y: 118 + rowHeight * line + offsetY, width: 200, height: 20, text: '&larr; поле для оптравки сообщений в чат.'});


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
