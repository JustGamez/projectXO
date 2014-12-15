/**
 * Логика главной страницы.
 * @constructor
 */
LogicPageMain = function () {

    /**
     * Действия при нажатии кнопки "Играть".
     */
    this.onPlayButtonClick = function () {
        //alert('You are click me! Welcome to mysterios world!');
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_XO_GAME]);
    };

    /**
     * Действия при смене флага "С роботом".
     * @param value {boolean}
     */
    this.onFlagVsRobotChange = function (value) {
        // @todo
        return;
        if (value) {
            alert("The rise of the robots!");
        } else {
            alert("The sunset of the robots!");
        }
    };


    /**
     * Действия при смене типа поля. 3х3 или 15х15.
     * @param value {Number}
     * @param index {Number}
     */
    this.onRadioSignChange = function (value, index) {
        // @todo
        return;
        alert(value + " " + index);
    };
};

/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();