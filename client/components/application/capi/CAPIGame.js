CAPIGame = function () {

    /**
     * Обновить данные об игре.
     * @param cntx {Object} контекст соединения.
     * @param game {Object} данные об игре.
     */
    this.updateInfo = function (cntx, game) {
        var winLine;
        winLine = LogicXO.findWinLine(game);
        LogicXO.setOutcomeResults(game, winLine);
        LogicGame.updateInfo(game);
    };

    /**
     * Оповещение, что игра создана.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        if (!LogicGame.getCurrentGameId() && pageController.isShowedNow(PageController.PAGE_ID_XO_GAME)) {
            LogicGame.setCurrentGameId(gameId);
        } else {
            SAPIGame.closeRandomGame(gameId);
        }
    };

    /**
     * Робот сделал ход.
     * После хода робота, проверим есть ли победитель, ну или, либо ничья.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры, в которой бот сделал ход.
     */
    this.robotDoMove = function (cntx, gameId) {
        var winLine, game, checkWinner;
        game = LogicGame.getCurrentGame();
        if (!game) {
            Logs.log("CAPIGame.robotDoMove. game does not exists.", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (game.id != gameId) {
            Logs.log("CAPIGame.robotDoMove. gameId mismatch requsted.", Logs.LEVEL_WARNING, gameId);
            return;
        }
        winLine = LogicXO.findWinLine(game);
        LogicXO.setOutcomeResults(game, winLine);
        checkWinner = game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin;
        if (checkWinner) {
            SAPIRobotGame.checkWinner(gameId);
        }
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();