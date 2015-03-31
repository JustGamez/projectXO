/**
 * Страница шаблон.
 * @constructor
 */
PageOnlineAndRating = function PageOnlineAndRating() {
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
     * Элемент-текст отображающий количество онлайн игроков.
     * @type {ElementGraphicText}
     */
    this.elementOnlineIndicator;

    /**
     * Элемент-текст отображает количество очков игрока.
     * @type {ElementGraphicText}
     */
    this.elementPositionIndicator;

    /**
     * кард-инфо юзера.
     * @type {ElementCardInfo}
     */
    var elementCardInfo;

    this.init = function () {
        var element;
        /* Тут создаются элементы страницы. */
        /* online indicator */
        element = GUI.createElement(ElementGraphicText, {
            x: 575,
            y: 395,
            width: 140,
            text: 'онлайн: -'
        });
        self.elements.push(element);
        self.elementOnlineIndicator = element;
        /* rating position */
        element = GUI.createElement(ElementGraphicText, {
            x: 575,
            y: 425,
            width: 160,
            text: 'рейтинг: -',
            pointer: GUI.POINTER_HAND
        });
        self.elements.push(element);
        self.elementPositionIndicator = element;
        element = GUI.createElement(ElementCardInfo, {
            x: 445,
            y: 320
        });
        elementCardInfo = element;
        GUI.bind(self.elementPositionIndicator.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(self.elementPositionIndicator.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
        element = GUI.createElement(ElementImage, {
            x: 659,
            y: 415,
            src: '/images/ratingInfo.png',
            opacity: 0.87,
            pointer: GUI.POINTER_HAND
        });
        self.elements.push(element);
        GUI.bind(element.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(element.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
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
        elementCardInfo.hide();
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var onlineCount, position, user;
        /* Возможны какие то обновления, до отрисовки. */
        onlineCount = LogicUser.getOnlineCount();
        user = LogicUser.getCurrentUser();
        if (user && user.id) {
            position = LogicUser.getRatingPosition();
        }
        self.elementOnlineIndicator.setText('онлайн: ' + (typeof onlineCount == 'number' ? onlineCount : '-'));
        self.elementPositionIndicator.setText('рейтинг:  ' + (typeof position == 'number' ? position : '-'));
        elementCardInfo.updateUser(LogicUser.getCurrentUser());
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

    /**
     * При наведении мыши, покажем кард инфо.
     */
    var onMouseOver = function () {
        elementCardInfo.updateUser(LogicUser.getCurrentUser());
        elementCardInfo.show();
    };

    /**
     * При уходе фокуса мыши, прячем кард инфо.
     */
    var onMouseOut = function () {
        elementCardInfo.hideStart();
    };
};
