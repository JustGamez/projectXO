/**
 * Элемент радио-кнопки.
 * @constructor
 */
ElementRadio = function () {
    var self = this;
    /**
     * Тут мы будем хранить набор опций.
     * @type {Array}
     */
    this.options = [];
    /**
     * Текущие значение.
     * @type {null}
     */
    this.currentValue = null;
    /**
     * Индекс текущего активного элемента.
     * @type {Number}
     */
    this.currentIndex = null;
    /**
     * Для каждой натойки:
     * - создадим дом.
     */
    this.init = function () {
        var option, dom;
        for (var i in self.options) {
            option = self.options[i];
            dom = GUI.createDom();
            option.mouseStateFocused = false;
            option.mouseStateDown = false;
            option.index = i;
            GUI.bind(dom, GUI.EVENT_MOUSE_MOUSE_DOWN, onMouseDown, option);
            GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, option);
            GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, option);
            GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, option);
            dom.show();
            option.dom = dom;
            if (option.index == self.currentIndex) {
                this.currentValue = option.value;
            }
        }
        self.redraw();
        self.onChange.call(self, self.currentValue, self.currentIndex);
    };

    this.show = function () {

    };

    this.hide = function () {

    };
    /*
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
     dom.redraw();
     */
    this.redraw = function () {
        var option, src;
        /**
         * @type {GUIDom}
         */
        var dom;
        for (var i in self.options) {
            option = self.options[i];
            dom = option.dom;
            dom.x = option.x;
            dom.y = option.y;
            dom.width = option.width;
            dom.height = option.height;
            {
                if (self.currentIndex == option.index) {
                    src = option.srcActive;
                    if (option.mouseStateFocused)src = option.srcHover;
                    if (option.mouseStateFocused && option.mouseStateDown) src = option.srcRest;
                    if (!option.mouseStateFocused && option.mouseStateDown) src = option.srcActive;
                } else {
                    src = option.srcRest;
                    if (option.mouseStateFocused)src = option.srcHover;
                    if (option.mouseStateFocused && option.mouseStateDown) src = option.srcActive;
                    if (!option.mouseStateFocused && option.mouseStateDown) src = option.srcRest;
                }
                dom.backgroundImage = src;
                dom.redraw();
            }
        }
    };
    /**
     * Обработка события фокуса мыши.
     */
    var onMouseOver = function () {
        this.mouseStateFocused = true;
        self.redraw();
    };
    /**
     * Обработчик события на опускание мыши.
     */
    var onMouseDown = function () {
        this.mouseStateDown = true;
        self.redraw();
    };
    /**
     * Обработка события выхода фокуса мыши.
     */
    var onMouseOut = function () {
        this.mouseStateFocused = false;
        self.redraw();
    };
    /**
     * Обработка события на клик.
     */
    var onMouseClick = function () {
        var oldCurrentIndex;
        oldCurrentIndex = self.currentIndex;
        this.mouseStateDown = false;
        this.mouseStateFocused = false;
        self.currentIndex = this.index;
        self.currentValue = this.value;
        self.redraw();
        /* вызываем onChange, только если действительно что то изменилось. */
        if (oldCurrentIndex != self.currentIndex) {
            self.onChange.call(self, self.currentValue, self.currentIndex);
        }
    };
};