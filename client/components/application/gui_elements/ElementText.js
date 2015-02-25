/**
 * Элемент: текст.
 * @constructor
 * Инициирующие параметры:
 * x : number координата X
 * y : number координата Y
 * width : number ширина поля
 * height : number высота поля
 * text : string текст
 */
ElementText = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X текста.
     * @type {number}
     */
    this.x = undefined;

    /**
     * Координата Y текста.
     * @type {number}
     */
    this.y = undefined;

    /**
     * Ширина текста.
     * @type {number}
     */
    this.width = undefined;

    /**
     * Высота текста.
     * @type {number}
     */
    this.height = undefined;

    /**
     * Текст.
     * @type {string}
     */
    this.text = '';

    /**
     * Дом для текста.
     * @type {GUIDom}
     */
    var dom = null;

    /**
     * Указатель мыши при наведении.
     * @type {string}
     */
    this.pointer = GUI.POINTER_ARROW;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.color = "rgba(68,62,0,0.7)";
        dom.fontSize = 21;
        GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, self);
    };

    /**
     * Покажем текст.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем текст.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Обновим текст.
     * @param text {string}
     */
    this.setText = function (text) {
        self.text = text;
    };

    /**
     * Перерисуем.
     */
    this.redraw = function () {
        if (!showed) return;
        refreshText();
    };

    var refreshText = function () {
        var textHTML, charCode;
        textHTML = '';
        for (var i in self.text) {
            var symbol = self.text[i];
            charCode = self.text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (charCode == 10) {
                textHTML += "<br>";
                continue;
            }
            textHTML += symbol;
        }
        dom.innerHTML = textHTML;
        dom.pointer = self.pointer;
        dom.redraw();
    };

    /**
     * Обработка события на клик.
     * @param mouseEvent {MouseEvent}
     * @param dom {Element}
     */
    var onMouseClick = function (mouseEvent, dom) {
        if (!self.onClick) {
            return;
        }
        /* Да, тут мы останавливаем дальнейшие течение клика. */
        mouseEvent.stopPropagation();
        return self.onClick.call(null, mouseEvent, dom);
    };
};