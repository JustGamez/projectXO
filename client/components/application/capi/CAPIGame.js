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
            if (created.id === looking.id) {
                LogicGame.setLookingGameId(created.id);
            }
            if (created.copyFromId === looking.id) {
                SAPIGameLooks.stop(looking.id);
                SAPIGameLooks.start(created.id);
                LogicGame.setLookingGameId(created.id);
            }
            if (created.id !== looking.id && created.copyFromId !== looking.id) {
                SAPIGameLooks.stop(looking.id);
                LogicGame.setLookingGameId(0);
                LogicGame.setCurrentGameId(created.id);
            }
        }

        if (!looking && current && current.vsRobot) {
            if (created.copyFromId === current.id) {
                LogicGame.setCurrentGameId(created.id);
            }
            if (!created.vsRobot) {
                SAPIGame.close(current.id);
                LogicGame.setCurrentGameId(created.id);
            }
        }

        if (!looking && current && !current.vsRobot) {
            if (created.copyFromId === current.id) {
                LogicGame.setCurrentGameId(created.id);
            }
        }

        if (!looking && !current) {
            LogicGame.setCurrentGameId(created.id);
        }

        if (LogicGame.getCurrentGameId() === created.id) {
            if (created.vsRobot === false) {
                LogicPageChat.openDialogWithUser(LogicXO.getOpponentUserId(created, LogicUser.getCurrentUser().id));
            }
        }
        PageController.showPage(PageXOGame);
        PageController.redraw();

        LogicGame.onTurnStart(created);
    };

    this.updateMove = function (cntx, gameId, x, y, timerStartPoint) {
        var game;
        game = LogicGame.getById(gameId);
        if (!game) {
            Logs.log("CAPIGAme.updateMove some error.", Logs.LEVEL_ERROR);
            return;
        }
        game.timerStartPoint = timerStartPoint;
        LogicGame.onSetSign(game, x, y);
    };

    this.onTimerFinished = function (cntx, gameId, timerStartPoint) {
        var game;
        game = LogicGame.getById(gameId);
        if (!game) {
            Logs.log("CAPIGAme.updateMove some error.", Logs.LEVEL_ERROR);
            return;
        }
        LogicGame.onTimerFinished(game, timerStartPoint);
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();
