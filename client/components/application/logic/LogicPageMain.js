/**
 * Логика главной страницы.
 * @constructor
 */
LogicPageMain = function () {
    /**
     * Действия при нажатии кнопки "Играть".
     */
    this.onPlayButtonClick = function () {
        alert('You are click me! Welcome to mysterios world!');
    };
};
/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();