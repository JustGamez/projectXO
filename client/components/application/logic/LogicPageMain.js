/**
 * Логика главной страницы.
 * @constructor
 */
LogicPageMain = function () {

    /**
     * Действия при нажатии кнопки "Играть".
     * - перейдем на страницу игры;
     * - запросим сервер встуть\создать случайную игру.
     */
    this.onPlayButtonClick = function () {
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_XO_GAME]);
        if (LogicXOSettings.requestedVsRobot) {
            SAPIRobotGame.startGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
        } else {
            SAPIGame.requestRandomGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
        }
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
     * @param value {Number}
     * @param index {Number}
     */
    this.onRadioSignChange = function (value, index) {
        LogicXOSettings.requestedSignId = value;
    };

    /**
     * Действия при нажатии на френд-ленте "пригласить в игру".
     * @param photoInfo {Object}
     */
    this.onInviteClick = function (photoInfo) {
        var whoId, whomId;
        whoId = LogicUser.getCurrentUser().id;
        whomId = photoInfo.id;
        SAPIInvites.send(whoId, whomId);
        LogicInvites.save(whoId, whomId);
        LogicTimers.start('invite_' + whomId, Config.Invites.inviteTimeout, LogicInvites.clearInvite, [whoId, whomId]);
    };

    /**
     * Действия при нажатии на френд-ленте "играем?".
     * @param photoInfo {Object}
     */
    this.onLetsPlayClick = function (photoInfo) {
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_XO_GAME]);
        SAPIInvites.createGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId, photoInfo.id);
    };
};

/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();