/**
 * Страница игры в Х-О.
 * @constructor
 */
PageXOGame = function PageXOGame() {
    var self = this;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Собствено проинициализируем нашу страницу.
     */
    this.init = function () {
        var element;
        /* Игровое поле*/
        element = GUI.createElement('ElementField', {
            x: 150,
            y: 138,
            width: 400,
            height: 400,
            onClick: LogicPageXO.onFieldSignClick
        });
        element.swithToField(LogicXO.FIELD_TYPE_15X15);
        element.setSign(1,1, LogicXO.SIGN_ID_X);
        element.clearField();
        element.setSign(0,0, LogicXO.SIGN_ID_O);
        element.setWinLine(0,0, LogicXO.WIN_LINE_LEFT_TO_UP);
        this.elements.push(element);
        /* Кнопка возврата на главную страницу. */
        element = GUI.createElement('ElementButton', {
            x: 545,
            y: 55,
            width: 148,
            height: 73,
            srcRest: '/images/buttons/menuRest.png',
            srcHover: '/images/buttons/menuHover.png',
            srcActive: '/images/buttons/menuActive.png',
            onClick: LogicPageXO.onMenuButtonClick
        });
        self.elements.push(element);
    };

    /**
     * Покажем элементы страницы.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрячем элементы страницы.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
    };

    /**
     * Обновим страницу.
     */
    this.redraw = function () {
        if (!showed)return;
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};