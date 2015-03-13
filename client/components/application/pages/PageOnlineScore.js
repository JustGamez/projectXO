/**
 * Страница шаблон.
 * @constructor
 */
PageOnlineScore = function PageOnlineScore() {
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
     *
     * @type {ElementText}
     */
    this.elementScore15x15vsPerson;

    /**
     * кард-инфо юзера.
     * @type {ElementCardInfo}
     */
    var elementCardInfo;

    this.init = function () {
        var element;
        /* Тут создаются элементы страницы. */
        /* online indicator */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 405,
            width: 140,
            text: 'онлайн: -'
        });
        self.elements.push(element);
        self.elementOnlineIndicator = element;
        /* rating position */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 435,
            width: 140,
            text: 'рейтинг: -',
            pointer: GUI.POINTER_HAND
        });
        self.elements.push(element);
        self.elementPositionIndicator = element;
        element = GUI.createElement("ElementImage", {
            x: 570 - 5,
            y: 470,
            src: '/images/cardInfo/image15x15vsPerson.png',
            title: 'Побед 15х15 с человеком.'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 570 + 58,
            y: 470 - 3,
            bold: true,
            fontSize: 19
        });
        self.elementScore15x15vsPerson = element;
        self.elements.push(element);
        element = GUI.createElement('ElementCardInfo', {
            x: 445,
            y: 320
        });
        GUI.bind(self.elementPositionIndicator.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(self.elementPositionIndicator.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
        elementCardInfo = element;
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
        var onlineCount, position, user, score15x15vsPerson;
        /* Возможны какие то обновления, до отрисовки. */
        onlineCount = LogicUser.getOnlineCount();
        user = LogicUser.getCurrentUser();
        if (user && user.id) {
            position = LogicUser.getRatingPosition(user.id);
            score15x15vsPerson = user.score15x15vsPerson;
        }
        self.elementOnlineIndicator.setText('онлайн: ' + (typeof onlineCount == 'number' ? onlineCount : '-'));
        self.elementPositionIndicator.setText('рейтинг: ' + (typeof position == 'number' ? position : '-'));
        self.elementScore15x15vsPerson.setText(typeof score15x15vsPerson == 'number' ? score15x15vsPerson : '-');
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
