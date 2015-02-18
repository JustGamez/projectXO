/**
 * Элемент флаг.
 * @constructor
 */
ElementFlag = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X флага.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y флага.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина флага.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота флага.
     * @type {number}
     */
    this.height = 0;

    /**
     * Хинт - подсказа при наведени мыши.
     * @type {string}
     */
    this.title = '';

    /**
     * Ссылка на картинку при наведении фокуса(мыши).
     * @type {string}
     */
    this.srcHover = '/path/to/image/hover.png';

    /**
     * Ссылка на картинку при активации флага(клике).
     * @type {string}
     */
    this.srcActive = '/path/to/image/active.png';

    /**
     * Ссылка на картинку в покое(ожидании/бездействии).
     * @type {string}
     */
    this.srcRest = 'path/to/image/rest.png';

    /**
     * Состояние по умолчанию.
     * @type {boolean}
     */
    this.defaultState = false;

    /**
     * Будет вызываться при изменении состояния.
     * @type {function}
     */
    this.onChange = null;

    /**
     * Дом картинки.
     * @type {GUIDom}
     */
    var dom = null;

    /**
     * Опущена ли мышка.
     * @type {boolean}
     */
    var mouseStateDown = false;

    /**
     * Находиться ли мышь над элементом.
     * @type {boolean}
     */
    var mouseStateFocused = false;

    /**
     * Состояние флага.
     * @type {boolean}
     */
    var flagState = false;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        flagState = self.defaultState;
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.backgroundImage = this.srcRest;
        dom.pointer = GUI.POINTER_HAND;
        /* В будущем мы возможно спасём немного времени с помощью этой проверке. */
        if (this.width == 0) {
            Logs.log("ElementFlag: width = 0, Возможно элемент не будет видно на странице!", Logs.LEVEL_WARNING, this);
        }
        /* В будущем мы возможно спасём немного времени с помощью этой проверке. */
        if (this.height == 0) {
            Logs.log("ElementFlag: width = 0, Возможно элемент не будет видно на странице!", Logs.LEVEL_WARNING, this);
        }
        GUI.bind(dom, GUI.EVENT_MOUSE_MOUSE_DOWN, onMouseDown, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
        self.redraw();
        self.onChange.call(null, flagState);
    };

    /**
     * Покажем флаг.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем флаг.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Перерисуем флаг.
     */
    this.redraw = function () {
        var src;
        if (!showed) return;
        if (flagState == false) {
            src = self.srcRest;
            if (mouseStateFocused)src = self.srcHover;
            if (mouseStateFocused && mouseStateDown) src = self.srcActive;
            if (!mouseStateFocused && mouseStateDown) src = self.srcRest;
        } else {
            src = self.srcActive;
            if (mouseStateFocused)src = self.srcHover;
            if (mouseStateFocused && mouseStateDown) src = self.srcRest;
            if (!mouseStateFocused && mouseStateDown) src = self.srcActive;
        }
        dom.backgroundImage = src;
        dom.title = self.title;
        dom.redraw();
    };

    /**
     * Обработка события фокуса мыши.
     */
    var onMouseOver = function () {
        mouseStateFocused = true;
        self.redraw();
    };

    /**
     /**
     * Обработчик события на опускание мыши.
     */
    var onMouseDown = function () {
        mouseStateDown = true;
        self.redraw();
    };

    /**
     * Обработка события выхода фокуса мыши.
     */
    var onMouseOut = function () {
        mouseStateFocused = false;
        self.redraw();
    };

    /**
     * Обработка события на клик.
     */
    var onMouseClick = function () {
        flagState = !flagState;
        mouseStateDown = false;
        mouseStateFocused = false;
        self.redraw();
        self.onChange.call(null, flagState);
    };
};