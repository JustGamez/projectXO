SAPIRepeatGame = function () {

    /**
     * Запрос на повтор игры.
     * @param cntx {object} контекст соединения
     * @param gameId {int}
     */
    this.repeat = function (cntx, gameId) {
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIRepeatGame.repeat: must have gameId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRepeatGame.repeat: user must be authorized", Logs.LEVEL_WARNING, {
                userId: cntx.userId,
                gameId: gameId
            });
            return;
        }
        ActionsRepeatGame.copyGame(gameId);
    };
};
/**
 * Статичный класс.
 * @type {SAPIRepeatGame}
 */
SAPIRepeatGame = new SAPIRepeatGame();
