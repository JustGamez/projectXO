ActionsRepeatGame = function () {
    var self = this;

    /**
     * Скопируем игру, и затянем туда игроков.
     * @param gameId {Number} id игры.
     */
    this.copyGame = function (gameId) {
        var newGame;
        var prid = Profiler.start(Profiler.ID_REPEATE_GAME);
        DataGame.getById(gameId, function (oldGame) {
            if (!oldGame) {
                Logs.log("ActionsRepratGame.copyGame. game not found.", Logs.LEVEL_WARNING, gameId);
                return;
            }
            newGame = LogicXO.copy(oldGame);
            DataGame.save(newGame, function (newGame) {
                CAPIGame.updateInfo(newGame.creatorUserId, newGame);
                CAPIGame.gameCreated(newGame.creatorUserId, newGame.id);
                if (!newGame.vsRobot) {
                    CAPIGame.updateInfo(newGame.joinerUserId, newGame);
                    CAPIGame.gameCreated(newGame.joinerUserId, newGame.id);
                }
                var lookers = LogicGameLookers.get(oldGame.id);
                for (var userId in lookers) {
                    CAPIGame.updateInfo(userId, newGame);
                    CAPIGame.gameCreated(userId, newGame.id);
                }
                Profiler.stop(Profiler.ID_REPEATE_GAME, prid);
            });
        });
    }
};

/**
 * Константный класс.
 * @type {ActionsRepeatGame}
 */
ActionsRepeatGame = new ActionsRepeatGame();
