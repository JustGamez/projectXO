SAPIGame = function () {

    /**
     * Запрос на создание игры.
     * @param cntx {Object} контекст соединения.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.requestRandomGame = function (cntx, fieldTypeId, signId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.startRandomGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!fieldTypeId || !(fieldTypeId == LogicXO.FIELD_TYPE_3X3 || fieldTypeId == LogicXO.FIELD_TYPE_15X15)) {
            Logs.log("SAPIGame.startRandomGame: must have fieldTypeId", Logs.LEVEL_WARNING, fieldTypeId);
            return;
        }
        if (!signId || !(signId == LogicXO.SIGN_ID_X || signId == LogicXO.SIGN_ID_O || signId == LogicXO.SIGN_ID_Empty)) {
            Logs.log("SAPIGame.startRandomGame: must have signId", Logs.LEVEL_WARNING, signId);
            return;
        }
        ActionsXO.requestRandomGame(cntx.userId, fieldTypeId, signId);
    };

    this.cancelRandomGameRequests = function(cntx){
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.cancelRandomGameRequest: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        ActionsXO.cancelRandomGameRequests(cntx.userId);
    };

    /**
     * Закроем игру, обычно это означает, что игрок вышел из игры.
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     */
    this.closeGame = function (cntx, gameId) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.closeGame: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.startRandomGame: must have fieldTypeId", Logs.LEVEL_WARNING, fieldTypeId);
            return;
        }
        ActionsXO.closeGame(cntx.userId, gameId);
    };
};
/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
