/**
 * Логика главной страницы.
 * @constructor
 */
LogicPageMain = function () {

    /**
     * Действия при нажатии кнопки "Играть".
     * - перейдем на страницу игры;
     * - запросим сервер создать игру c роботом.
     */
    this.onPlayButtonClick = function () {
        LogicUser.setBusy(true);
        PageController.showPage(PageXOGame);
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
        PageController.redraw();
    };

    /**
     * Действия при нажатии на френд-ленте "пригласить в игру".
     * @param user {Object}
     */
    this.onInviteClick = function (user) {
        var whoId, whomId;
        whoId = LogicUser.getCurrentUser().id;
        whomId = user.id;
        SAPIInvites.send(whoId, whomId, LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
        LogicInvites.save(whoId, whomId, LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
        LogicTimers.start('invite_' + whomId, Config.Invites.inviteTimeout, LogicInvites.clearInviteByPare, [whoId, whomId]);
    };

    /**
     * Действия при нажатии на френд-ленте "играем?".
     * @param user {Object}
     */
    this.onLetsPlayClick = function (user) {
        var invite, sign;
        LogicUser.setBusy(true);
        PageController.showPage(PageXOGame);
        invite = LogicInvites.get(user.id, LogicUser.getCurrentUser().id);
        SAPIInvites.createGame(invite.fieldTypeId, invite.signId, LogicXOSettings.requestedSignId, invite.whoId);
    };

    this.onLookGameClick = function (user) {
        var game = LogicGame.getById(user.onGameId);
        SAPIStatistic.clickLookGameStart();
        if (game && LogicXO.isMember(game, LogicUser.getCurrentUser().id)) {
            LogicGame.setCurrentGameId(game.id);
            // @todo reopen game?
            PageController.showPage(PageXOGame);
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
        PageController.showBlocks([PageBlockBackground, PageBlockRating]);
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
