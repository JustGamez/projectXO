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
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_MAIN]);
        game = LogicGame.getCurrentGame();
        if (game) {
            if (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN) {
                SAPIGame.closeGame(game.id);
            }
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
        if (!LogicXO.userCandDoMove(game, user.id, x, y)) {
            Logs.log("current user can't go right now", Logs.LEVEL_DETAIL);
            return;
        }
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        winLine = LogicXO.findWinLine(game);
        game = LogicXO.setOutcomeResults(game, winLine);
        LogicGame.updateInfo(game);
        SAPIGame.doMove(game.id, x, y, game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin);
    };
}
;
/**
 * Константный класс.
 * @type {LogicPageXO}
 */
LogicPageXO = new LogicPageXO();