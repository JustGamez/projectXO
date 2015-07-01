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
            PageController.showPage(PageXOGame);
        }
        LogicGame.update(game);
        LogicTurnTimer.start(game.lastTurnTimestamp);
    };

    /**
     * Оповещение, что игра создана.
     * Если создана игра, это может быть:
     * - наша c человеком;
     * - наша с роботом;
     * - мы просматриваем;
     * - копия игры с роботом;
     * - копия игры с человеком.
     * @param cntx {Object} контекст соединения.
     * @param gameId {int} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        var current, created, looking;
        created = LogicGame.getById(gameId);
        current = LogicGame.getCurrentGame();
        looking = LogicGame.getLookingGameId() ? LogicGame.getById(LogicGame.getLookingGameId()) : false;

        LogicUser.loadNameCasesById(created.creatorUserId);
        LogicUser.loadNameCasesById(created.joinerUserId);

        if (looking) {
            if (created.id == looking.id) {
                LogicGame.setLookingGameId(created.id);
            }
            if (created.copyFromId == looking.id) {
                SAPIGameLooks.stop(looking.id);
                SAPIGameLooks.start(created.id);
                LogicGame.setLookingGameId(created.id);
            }
            if (created.id != looking.id && created.copyFromId != looking.id) {
                SAPIGameLooks.stop(looking.id);
                LogicGame.setLookingGameId(0);
                LogicGame.setCurrentGameId(created.id);
            }
        }

        if (!looking && current && current.vsRobot) {
            if (created.copyFromId == current.id) {
                LogicGame.setCurrentGameId(created.id);
            }
            if (!created.vsRobot) {
                SAPIGame.close(current.id);
                LogicGame.setCurrentGameId(created.id);
            }
        }

        if (!looking && current && !current.vsRobot) {
            if (created.copyFromId == current.id) {
                LogicGame.setCurrentGameId(created.id);
            }
        }

        if (!looking && !current) {
            LogicGame.setCurrentGameId(created.id);
        }

        if (LogicGame.getCurrentGameId() == created.id) {
            if (created.vsRobot && LogicXO.isHisTurn(created, 0)) {
                setTimeout(function () {
                    SAPIRobotGame.raiseAIMove(created.id)
                }, 750);
            }
            if (created.vsRobot == false) {
                LogicPageChat.openDialogWithUser(LogicXO.getOpponentUserId(created, LogicUser.getCurrentUser().id));
            }
        }
        LogicTurnTimer.start(created.lastTurnTimestamp);

        PageController.showPage(PageXOGame);
        PageController.redraw();
    };

    this.updateMove = function (cntx, gameId, x, y, lastTurnTimestamp) {
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
        game.lastTurnTimestamp = lastTurnTimestamp;
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
        LogicTurnTimer.start(lastTurnTimestamp);
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();
