/**
 * Основная страница игры.
 * @constructor
 */
PageMain = function PageMain() {
    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент-текст отображающий количество онлайн игроков.
     * @type {ElementGraphicText}
     */
    this.elementOnlineIndicator = null;

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
        this.elements.push(element);
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
        this.elements.push(element);
        // online indicator
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 425,
            text: 'онлайн: -'
        });
        this.elements.push(element);
        this.elementOnlineIndicator = element;
        element = GUI.createElement("ElementFlag", {
            x: 132,
            y: 170,
            height: 83,
            width: 142,
            srcRest: '/images/flags/vsRobotRest.png',
            srcHover: '/images/flags/vsRobotHover.png',
            srcActive: '/images/flags/vsRobotActive.png',
            defaultState: false,
            onChange: LogicPageMain.onFlagVsRoboChange
        });
        this.elements.push(element);
    };

    this.show = function () {
        this.redraw();
    };

    this.hide = function () {
    };

    this.redraw = function () {
        var onlineCount = LogicUser.getOnlineCount();
        this.elementOnlineIndicator.updateText('онлайн: ' + (onlineCount ? onlineCount : '-'));
    };
};