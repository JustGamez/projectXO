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
        LogicUser.setBusy(true);
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        SAPIRobotGame.createGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
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
     * @param user {Object}
     */
    this.onInviteClick = function (user) {
        var whoId, whomId;
        whoId = LogicUser.getCurrentUser().id;
        whomId = user.id;
        SAPIInvites.send(whoId, whomId);
        LogicInvites.save(whoId, whomId);
        LogicTimers.start('invite_' + whomId, Config.Invites.inviteTimeout, LogicInvites.clearInviteByPare, [whoId, whomId]);
    };

    /**
     * Действия при нажатии на френд-ленте "играем?".
     * @param user {Object}
     */
    this.onLetsPlayClick = function (user) {
        LogicUser.setBusy(true);
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        SAPIInvites.createGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId, user.id);
    };

    this.onLookGameClick = function (user) {
        var game = LogicGame.getById(user.onGameId);
        SAPIStatistic.clickLookGameStart();
        if (game && LogicXO.isMember(game, LogicUser.getCurrentUser().id)) {
            LogicGame.setCurrentGameId(game.id);
            pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        } else {
            SAPIGameLooks.start(user.onGameId);
            LogicUser.setBusy(true);
            LogicGame.setLookingGameId(user.onGameId);
        }
    };

    /**
     * Действия при нажатии на кнопку "Рейтинг.
     * Откроем страницу рейтинга.
     */
    this.onRatingButtonClick = function () {
        SAPIStatistic.onRatingButtonClick();
        LogicUser.setBusy(true);
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_RATING]);
    };

    /**
     * Действия при нажатии кнопки добавления друзей.
     */
    this.onAddFriendButtonClick = function () {
        SAPIStatistic.openInviteFriendDialog();
        SocNet.openInviteFriendDialog();
    };
};

/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();
