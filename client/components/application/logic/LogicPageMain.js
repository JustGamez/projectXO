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
        LogicXOSettings.requestedVsRobot = value;
    };

    /**
     * Действия при смене типа поля. 3х3 или 15х15.
     * @param value {Number}
     * @param index {Number}
     */
    this.onRadioFieldTypeChange = function (value, index) {
        LogicXOSettings.requestedFieldTypeId = value;
    };

    /**
     * Действия при смене знака.
     * @param value
     * @param index
     */
    this.onRadioSignChange = function (value, index) {
        LogicXOSettings.requestedSignId = value;
    };
};

/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();