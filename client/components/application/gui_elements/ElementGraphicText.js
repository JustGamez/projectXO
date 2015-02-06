/**
 * Элемент графический текст.
 * Тут каждая буква будет текстом.
 * @constructor
 * Инициирующие параметры:
 * x : number координата X
 * y : number координата Y
 * width : number ширина поля
 * height : number высота поля
 * text : string текст
 */
ElementGraphicText = function () {
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
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
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
        var textHTML, symbol_url, charCode, existsSymbols;
        existsSymbols = '1234567890абвгдеёжзийклмнопрстуфхцчшщьыъэюя.!- АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        textHTML = '';
        for (var i in self.text) {
            var symbol = self.text[i];
            charCode = self.text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (charCode == 10) {
                textHTML += "<br>";
                continue;
            }
            if (GUIDom.hidePictures) {
                textHTML += symbol;
            } else {
                if (existsSymbols.indexOf(symbol) == -1) {
                    textHTML += "<b style='font-size:21px;color:rgba(68,62,0,0.7);'>" + symbol + "</b>";
                } else {
                    symbol_url = "/images/font/" + charCode + ".png";
                    textHTML += "<img alt='" + symbol + "' src='" + GUI.getImageURL(symbol_url) + "'  />";
                }
            }
        }
        dom.innerHTML = textHTML;
        dom.redraw();
    };
};