ActionsRepeatGame = function () {
    var self = this;

    /**
     * Скопируем игру, и затянем туда игроков.
     * @param gameId {Number} id игры.
     */
    this.copyGame = function (gameId) {
        Profiler.start(Profiler.ID_ACTIONS_REPEAT_GAME_COPY);
        DataGame.getById(gameId, function (oldGame) {
            if (!oldGame) {
                Logs.log("ActionsRepratGame.copyGame. game not found.", Logs.LEVEL_WARNING, gameId);
                return;
            }
            var newGame = LogicXO.copy(oldGame);
            DataGame.save(newGame, function (newGame) {

                LogicGameStore.save(newGame);

                if (newGame.vsRobot) {
                    LogicRobot.initState(newGame);
                    /* Если ход робота, то надо сделать ему ход */
                    if (LogicXO.isHisTurn(newGame, 0)) {
                        ActionsRobotGame.raiseAIMove(newGame.id, function (newGame) {
                            CAPIGame.updateInfo(newGame.creatorUserId, newGame);
                        });
                    }
                }
                /* Update info. */
                CAPIGame.updateInfo(newGame.creatorUserId, newGame);
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
                    CAPIGame.gameCreated(newGame.joinerUserId, newGame.id);
                }
                Profiler.stop(Profiler.ID_ACTIONS_REPEAT_GAME_COPY);
            });
        });
    }
};

/**
 * Константный класс.
 * @type {ActionsRepeatGame}
 */
ActionsRepeatGame = new ActionsRepeatGame();