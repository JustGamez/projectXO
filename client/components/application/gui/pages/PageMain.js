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
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            src: '/images/someImage.png'
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