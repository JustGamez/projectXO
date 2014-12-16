/**
 * Логика страницы игрового поля.
 * @constructor
 */
LogicPageXO = function () {

    /**
     * Действия при нажатии кнопки "Меню".
     */
    this.onMenuButtonClick = function () {
        //alert('You are click me! Welcome to mysterios world!');
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_MAIN]);
    };


    /**
     * Действия при нажатии на знак в поле.
     */
    this.onFieldSignClick = function (x, y) {
        console.log(x, y);

    };
};
/**
 * Константный класс.
 * @type {LogicPageXO}
 */
LogicPageXO = new LogicPageXO();