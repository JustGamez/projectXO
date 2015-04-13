/**
 * Логика страницы игрового поля.
 * @constructor
 */
LogicPageXO = function () {
    var self = this;

    this.waitRepeat = false;

    /**
     * Действия при нажатии кнопки "Меню".
     * - Мы должны выйти в основное окно и закрыть игру, если она есть, либо сообщить серверу, что мы больше не ждём игру.
     * Итак, если есть текущая игра в статусе запущена, закроем её и установим, что текущей игры у нас нет.
     * Если текущей игры нет, сообщим серверу, что не ждём игры.
     */
    this.onMenuButtonClick = function () {
        var game, lookingGameId;
        LogicUser.setBusy(false);
        PageController.showPage(PageMain);
        game = LogicGame.getCurrentGame();
        lookingGameId = LogicGame.getLookingGameId();
        if (game && !lookingGameId) {
            if (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN) {
                if (game.vsRobot) {
                    SAPIRobotGame.close(game.id);
                }
                if (game.isInvitation) {
                    SAPIGame.close(game.id);
                }
            }
            LogicGame.setCurrentGameId(0);
        } else if (lookingGameId) {
            SAPIStatistic.clickLookGameStop();
            LogicGame.setLookingGameId(0);
            SAPIGameLooks.stop(lookingGameId)
        }
        LogicPageChat.openDialogWithUser(0);
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
        Sounds.play('/sounds/turn.mp3');
        /* Сообщим серверу. */
        SAPIGame.doMove(game.id, x, y);
        /* Обновим у нас. */
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        /* Проверим, есть ли победитель. */
        winLine = LogicXO.findWinLine(game);
        game = LogicXO.setOutcomeResults(game, winLine);
        LogicGame.update(game);
        if (game.vsRobot) {
            if (!(game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin)) {
                setTimeout(function () {
                    SAPIRobotGame.raiseAIMove(game.id)
                }, 350);
            }
        }
        if (game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin) {
            /* send win line coords */
            SAPIGame.checkWinner(game.id);
        }
    };

    /**
     * Действия, при нажатии на кнопку "Ещё"
     */
    this.onAgainButtonClick = function () {
        self.waitRepeat = true;
        setTimeout(function () {
            self.waitRepeat = false;
        }, 100);
        SAPIRepeatGame.repeat(LogicGame.getCurrentGameId());
    };
};

/**
 * Константный класс.
 * @type {LogicPageXO}
 */
LogicPageXO = new LogicPageXO();
