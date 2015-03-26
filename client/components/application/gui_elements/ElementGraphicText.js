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
     * По умолчанию 28. Это высота буквы.
     * @type {number}
     */
    this.height = 28;

    /**
     * Текст.
     * @type {string}
     */
    this.text = '';

    /**
     * Прозрачность текста.
     * @type {number}
     */
    this.opacity = undefined;

    /**
     * Выравнивать по правой стороне.
     * @type {boolean}
     */
    this.alignCenter = false;

    /**
     * Дом для текста.
     * @type {GUIDom}
     */
    var dom = null;

    this.pointer = undefined;

    this.dom = null;

    this.scale = undefined;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.width = self.width;
        dom.height = self.height;
        if (self.alignCenter) {
            dom.alignText = 'center';
        }
        /* Но, это только для текста без картинки, т.к. у нас не все символы есть. Пока что. */
        dom.color = "rgba(68,62,0,0.7)";
        dom.fontSize = 21;
        dom.pointer = self.pointer;
        self.dom = dom;
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
        self.text = text.toString();
    };

    /**
     * Перерисуем.
     */
    this.redraw = function () {
        if (!showed) return;
        refreshText();
        dom.x = self.x;
        dom.y = self.y;
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
                    textHTML += symbol;
                } else {
                    symbol_url = "/images/font/" + charCode + ".png";
                    if (self.scale) {
                        textHTML += "<img height = " + self.scale * 28 + " alt='" + symbol + "' src='" + GUI.getImageURL(symbol_url) + "'  />";
                    } else {
                        textHTML += "<img alt='" + symbol + "' src='" + GUI.getImageURL(symbol_url) + "'  />";
                    }
                }
            }
        }
        dom.innerHTML = textHTML;
        dom.opacity = self.opacity;
        dom.redraw();
    };
};
