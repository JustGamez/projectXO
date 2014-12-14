/**
 * Элемент кнопки.
 * @constructor
 */
ElementButton = function () {
    var self = this;
    /**
     * Координата X кнопки.
     * @type {number}
     */
    this.x = 0;
    /**
     * Координата Y кнопки.
     * @type {number}
     */
    this.y = 0;
    /**
     * Ширина кнопки.
     * @type {number}
     */
    this.width = 0;
    /**
     * Высота кноки.
     * @type {number}
     */
    this.height = 0;
    /**
     * Ссылка на картинку при наведении фокуса(мыши).
     * @type {string}
     */
    this.srcHover = '/path/to/image/hover.png';
    /**
     * Ссылка на картинку при активации кнопки(клике).
     * @type {string}
     */
    this.srcActive = '/path/to/image/active.png';
    /**
     * Ссылка на картинку в покое(ожидании/бездействии).
     * @type {string}
     */
    this.srcRest = 'path/to/image/rest.png';
    /**
     * Будет вызываться при нажатии на кнопку.
     * @type {function}
     */
    this.onClick = null;
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
     * Мышь в фокусе.
     * @type {boolean}
     */
    var mouseStateFocused = false;
    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.backgroundImage = this.srcRest;
        GUI.bind(dom, GUI.EVENT_MOUSE_MOUSE_DOWN, onMouseDown, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
        dom.show();
        self.redraw();
    };

    this.show = function () {

    };

    this.hide = function () {

    };

    this.redraw = function () {
        var src;
        src = self.srcRest;
        if (mouseStateFocused)src = self.srcHover;
        if (mouseStateFocused && mouseStateDown) src = self.srcActive;
        if (!mouseStateFocused && mouseStateDown) src = self.srcRest;
        dom.backgroundImage = src;
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
        mouseStateDown = false;
        mouseStateFocused = false;
        self.redraw();
        self.onClick.call();
    };
};