/**
 * Элемент шаблон.
 * @constructor
 */
__ElementName__ = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота.
     * @type {number}
     */
    this.height = 0;

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {
        /* Создание элементов и\или домов. */
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* Показать элементы\домы. */
        self.redraw();
    };

    /**
     * Спрячем элемент.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        /* Спрятать элементы\домы. */
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        if (!showed) return;
        /* Перерисовка элементов\домов. */
    };
};