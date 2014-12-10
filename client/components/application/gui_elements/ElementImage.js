/**
 * Элемент картинки.
 * @constructor
 */
ElementImage = function () {
    /**
     * Координата X картинки.
     * @type {number}
     */
    this.x = 0;
    /**
     * Координата Y картинки.
     * @type {number}
     */
    this.y = 0;
    /**
     * Ширина картинки.
     * @type {number}
     */
    this.width = 0;
    /**
     * Высота картинки.
     * @type {number}
     */
    this.height = 0;
    /**
     * Ссылка на картинку.
     * @type {string}
     */
    this.src = '/path/to/image.png';

    /**
     * Дом картинки.
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
        dom.backgroundImage = this.src;
        dom.show();
        dom.redraw();
    };

    this.show = function () {

    };

    this.hide = function () {

    };

    this.redraw = function () {

    };
};