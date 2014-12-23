/**
 * Логика страницы игрового поля.
 * @constructor
 */
LogicPageXO = function () {

    /**
     * Действия при нажатии кнопки "Меню".
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
     */
    this.onFieldSignClick = function (x, y) {
        console.log(x, y);

    };
}
;
/**
 * Константный класс.
 * @type {LogicPageXO}
 */
LogicPageXO = new LogicPageXO();