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
        SAPIUserState.isBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
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
        LogicTimers.start('invite_' + whomId, Config.Invites.inviteTimeout, LogicInvites.clearInviteByPare, [whoId, whomId]);
    };

    /**
     * Действия при нажатии на френд-ленте "играем?".
     * @param photoInfo {Object}
     */
    this.onLetsPlayClick = function (photoInfo) {
        SAPIUserState.isBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        SAPIInvites.createGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId, photoInfo.id);
    };

    /**
     * Действия при нажатии на кнопку "Рейтинг.
     * Откроем страницу рейтинга.
     */
    this.onRatingButtonClick = function () {
        SAPIUserState.isBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_RATING]);
    };

    /**
     * Действия при нажатии кнопки добавления друзей.
     */
    this.onAddFriendButtonClick = function () {
        SAPIStatistic.openInviteFriendDialog();
        //alert("Вообще то эта кнопка для приглашения ваших друзей, но... эта игра еще не опубликована, но мы рады что вы оказались пользователем этой игры, до её запуска!");
        //return;
        SocNet.openInviteFriendDialog();
    };

    /**
     * Действия при нажатии кнопки "(?)"
     */
    this.onButtonHelpClick = function () {
        SAPIUserState.isBusy();
        LogicPageHelp.showPageAndTab();
    }
};

/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();