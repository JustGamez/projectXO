/**
 * Основная страница игры.
 * @constructor
 */
PageMain = function PageMain() {
    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    this.init = function () {
        var element;

        element = GUI.createElement('ElementImage', {
            x: 0,
            y: 0,
            width: 788,
            height: 594,
            src: '/images/table.png'
        });
        this.elements.push(element);
    };

    this.show = function () {
    };

    this.hide = function () {
    };

    this.redraw = function () {
    };
};