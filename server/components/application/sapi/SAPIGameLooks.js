SAPIGameLooks = function () {

    /**
     * «апрос на наблюдение за игрой.
     * @param cntx {object} контекст соединени€.
     * @param gameId {int}
     */
    this.start = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGameLooks.start: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (gameId == undefined || typeof gameId != 'number') {
            Logs.log("SAPIGameLooks.start: must have message with type string", Logs.LEVEL_WARNING, [gameId, typeof gameId]);
            return;
        }
        DataGame.getById(gameId, function (game) {
            LogicGameLookers.add(game.id, cntx.userId);
            CAPIGame.updateInfo(cntx.userId, game);
        });
    };

    /**
     * «апрос на остановку наблюдени€ за игрой.
     * @param cntx {object} контекст соединени€.
     * @param gameId {int}
     */
    this.stop = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGameLooks.start: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (gameId == undefined || typeof gameId != 'number') {
            Logs.log("SAPIGameLooks.start: must have message with type string", Logs.LEVEL_WARNING, [gameId, typeof gameId]);
            return;
        }
        DataGame.getById(gameId, function (game) {
            LogicGameLookers.delete(game.id, cntx.userId);
        });
    };
};
/**
 * —татичный класс.
 * @type {SAPIGameLooks}
 */
SAPIGameLooks = new SAPIGameLooks();
