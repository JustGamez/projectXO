/**
 * Элемент графический текст.
 * Тут каждая буква будет текстом.
 * @constructor
 */
ElementGraphicText = function () {
    var self = this;
    /**
     * Координата X текста.
     * @type {number}
     */
    this.x = 0;
    /**
     * Координата Y текста.
     * @type {number}
     */
    this.y = 0;
    /**
     * Ширина текста.
     * @type {number}
     */
    this.width = 0;
    /**
     * Высота текста.
     * @type {number}
     */
    this.height = 0;
    /**
     * Текст.
     * @type {string}
     */
    this.text = '';

    /**
     * Дом для текста.
     * @type {GUIElement}
     */
    var dom = null;
    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.show();
        dom.redraw();
        this.redraw();
    };

    this.show = function () {

    };

    this.hide = function () {

    };

    this.updateText = function (text) {
        self.text = text;
        this.redraw();
    };

    this.redraw = function () {
        refreshText();
    };

    var refreshText = function () {
        var textHTML, symbol_url, charCode;
        textHTML = '';
        for (var i in self.text) {
            var symbol = self.text[i];
            charCode = self.text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (charCode == 10) {
                textHTML += "<br>";
                continue;
            }
            symbol_url = "/images/font/" + charCode + ".png";
            textHTML += "<img alt='" + symbol + "' src='" + GUI.getImageURL(symbol_url) + "'  />";
        }
        dom.innerHTML = textHTML;
        dom.redraw();
    };
};