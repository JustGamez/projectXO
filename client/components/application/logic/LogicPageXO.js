/**
 * Логика страницы игрового поля.
 * @constructor
 */
LogicPageXO = function () {

    /**
     * Действия при нажатии кнопки "Меню".
     * - Мы должны выйти в основное окно и закрыть игру, если она есть, либо сообщить серверу, что мы больше не ждём игру.
     * Итак, если есть текущая игра в статусе запущена, закроем её и установим, что текущей игры у нас нет.
     * Если текущей игры нет, сообщим серверу, что не ждём игры.
     */
    this.onMenuButtonClick = function () {
        var game;
        SAPIUserState.isNoBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);
        game = LogicGame.getCurrentGame();
        if (game) {
            if (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN) {
                if (game.vsRobot) {
                    SAPIRobotGame.closeGame(game.id);
                }
                if (game.isRandom) {
                    /* @todo вынести этот метод в SAPIRandomGame, наверное. */
                    SAPIGame.closeRandomGame(game.id);
                }
                if (game.isInvitation) {
                    SAPIInvites.closeGame(game.id);
                }
            }
            SAPIUserState.onGame(0);
            LogicGame.setCurrentGameId(null);
        } else {
            SAPIGame.cancelRandomGameRequests();
        }
    };

    /**
     * Действия при нажатии на знак в поле.
     * @param x {Number}
     * @param y {Number}
     */
    this.onFieldSignClick = function (x, y) {
        var game, user, winLine, checkWinLine;
        game = LogicGame.getCurrentGame();
        user = LogicUser.getCurrentUser();
        if (!game) {
            Logs.log("game not found", Logs.LEVEL_WARNING, arguments);
            return;
        }
        if (!LogicXO.userCanDoMove(game, user.id, x, y)) {
            Logs.log("current user can't go right now", Logs.LEVEL_DETAIL);
            return;
        }
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        winLine = LogicXO.findWinLine(game);
        game = LogicXO.setOutcomeResults(game, winLine);
        LogicGame.updateInfo(game);
        if (game.isRandom) {
            /* @todo на саммом деле это doMoveOnRandomGame. т.е. надо вынести это в SAPIRandomGame, должно быть */
            SAPIGame.doMove(game.id, x, y, game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin);
        }
        if (game.vsRobot) {
            SAPIRobotGame.doMove(game.id, x, y, game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin);
        }
        if (game.isInvitation) {
            SAPIInvites.doMove(game.id, x, y, game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin);
        }
    };

    /**
     * Действия, при нажатии на кнопку "Ещё"
     */
    this.onAgainButtonClick = function () {
        SAPIRepeatGame.repeat(LogicGame.getCurrentGameId());
    };
};

/**
 * Константный класс.
 * @type {LogicPageXO}
 */
LogicPageXO = new LogicPageXO();