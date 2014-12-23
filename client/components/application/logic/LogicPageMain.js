/**
 * Логика главной страницы.
 * @constructor
 */
LogicPageMain = function () {

    /**
     * Действия при нажатии кнопки "Играть".
     * - перейдем на страницу игры;
     * - запросим сервер встуть\создать случайную игру;
     */
    this.onPlayButtonClick = function () {
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_XO_GAME]);
        SAPIGame.requestRandomGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
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