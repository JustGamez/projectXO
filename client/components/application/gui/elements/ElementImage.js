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

    this.init = function () {
        console.log(this);
    };

    this.show = function () {

    };

    this.hide = function () {

    };

    this.redraw = function () {

    };
};