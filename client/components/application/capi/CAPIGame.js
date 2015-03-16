CAPIGame = function () {

    /**
     * Обновить данные об игре.
     * @param cntx {Object} контекст соединения.
     * @param game {Object} данные об игре.
     */
    this.updateInfo = function (cntx, game) {
        LogicGame.update(game);
    };

    /**
     * Оповещение, что игра создана.
     * @param cntx {Object} контекст соединения.
     * @param gameId {int} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        var current, created;
        current = LogicGame.getCurrentGame();
        created = LogicGame.getById(gameId);
        if (current && !current.finish) {
            SAPIGame.close(gameId);
        } else {
            LogicGame.setCurrentGameId(gameId);
            if (created.vsRobot && LogicXO.isHisTurn(created, 0)) {
                setTimeout(function () {
                    SAPIRobotGame.raiseAIMove(created.id)
                }, 750);
            }
            pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        }
    };

    this.updateMove = function (cntx, gameId, x, y) {
        var game, winLine;
        game = LogicGame.getById(gameId);
        if (!game) {
            Logs.log("CAPIGAme.updateMove some error.", Logs.LEVEL_ERROR);
            return;
        }
        /* Мы ставим это у себя. */
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        LogicGame.update(game);
        Sounds.play('/sounds/turn.mp3');
        if (game.vsRobot) {
            winLine = LogicXO.findWinLine(game);
            LogicXO.setOutcomeResults(game, winLine);
            if (game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin) {
                SAPIGame.checkWinner(gameId);
            }
        }
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();
