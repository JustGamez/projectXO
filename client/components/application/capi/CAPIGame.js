CAPIGame = function () {

    /**
     * Обновить данные об игре.
     * @param cntx {Object} контекст соединения.
     * @param game {Object} данные об игре.
     */
    this.updateInfo = function (cntx, game) {
        if (LogicGame.getLookingGameId()) {
            /* Вполне возможно, в игре уже решен исход. */
            LogicXO.setOutcomeResults(game, LogicXO.findWinLine(game));
            LogicGame.update(game);
            pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        }
        LogicGame.update(game);
    };

    /**
     * Оповещение, что игра создана.
     * @param cntx {Object} контекст соединения.
     * @param gameId {int} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        var current, created, lookingId, looking;
        current = LogicGame.getCurrentGame();
        created = LogicGame.getById(gameId);
        lookingId = LogicGame.getLookingGameId();
        if (lookingId) {
            looking = LogicGame.getById(lookingId);
            if (looking.id == created.copyFromId) {
                LogicGame.setLookingGameId(created.id);
                SAPIGameLooks.stop(looking.id);
                SAPIGameLooks.start(created.id);
                pageController.redraw();
            }
        } else {
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
        }
    };

    this.updateMove = function (cntx, gameId, x, y) {
        var game, currentGameId;
        game = LogicGame.getById(gameId);
        currentGameId = LogicGame.getCurrentGameId();
        if (!game) {
            Logs.log("CAPIGAme.updateMove some error.", Logs.LEVEL_ERROR);
            return;
        }
        Sounds.play('/sounds/turn.mp3');
        /* Мы ставим это у себя. */
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        LogicGame.update(game);
        /* В этом случае, мы являемсяе наблюдателем. */
        if (LogicGame.getLookingGameId()) {
            LogicXO.setOutcomeResults(game, LogicXO.findWinLine(game));
            LogicGame.update(game);
        }
        if (game.id == currentGameId && game.vsRobot) {
            LogicXO.setOutcomeResults(game, LogicXO.findWinLine(game));
            LogicGame.update(game);
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
