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
    /**
     * Действия при смене флага "С роботом".
     * @param value {boolean}
     */
    this.onFlagVsRoboChange = function (value) {
        if (value) {
            alert("The rise of the robots!");
        } else {
            alert("The sunset of the robots!");
        }
    }
};
/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();