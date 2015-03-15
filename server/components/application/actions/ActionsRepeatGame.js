ActionsRepeatGame = function () {
    var self = this;

    /**
     * Скопируем игру, и затянем туда игроков.
     * @param gameId {Number} id игры.
     */
    this.copyGame = function (gameId) {
        var prid = Profiler.start(Profiler.ID_REPEATE_GAME);
        DataGame.getById(gameId, function (oldGame) {
            if (!oldGame) {
                Logs.log("ActionsRepratGame.copyGame. game not found.", Logs.LEVEL_WARNING, gameId);
                Profiler.stop(Profiler.ID_REPEATE_GAME, prid);
                return;
            }
            var newGame = LogicXO.copy(oldGame);
            DataGame.save(newGame, function (newGame) {

                LogicGameStore.save(newGame);

                /* Update info. */
                CAPIGame.updateInfo(newGame.creatorUserId, newGame);
                if (newGame.vsRobot) {
                    LogicRobot.initState(newGame);
                    /* Если ход робота, то надо сделать ему ход */
                    if (LogicXO.isHisTurn(newGame, 0)) {
                        ActionsRobotGame.raiseAIMove(newGame.id);
                    }
                }
                if (!newGame.vsRobot) {
                    CAPIGame.updateInfo(newGame.joinerUserId, newGame);
                }
                /* Game created notify. */
                if (newGame.isInvitation) {
                    CAPIInvites.gameCreated(newGame.creatorUserId, newGame.id);
                } else {
                    CAPIGame.gameCreated(newGame.creatorUserId, newGame.id);
                }
                if (!newGame.vsRobot) {
                    // @todo rem,ove it.
                    //CAPIGame.gameCreated(newGame.joinerUserId, newGame.id);
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