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

    this.cancelRandomGameRequests = function (cntx) {
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
            Logs.log("SAPIGame.closeGame: must have fieldTypeId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        ActionsXO.closeGame(cntx.userId, gameId);
    };

    /**
     * Сделать ход в игре
     * @param cntx {Object} контекст соединения.
     * @param gameId {Number} id игры
     * @param x {Number}
     * @param y {Number}
     * @param checkWinner {Boolean}
     */
    this.doMove = function (cntx, gameId, x, y, checkWinner) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIGame.doMove: must be authorized", Logs.LEVEL_WARNING);
            return;
        }
        if (!gameId || typeof gameId != 'number') {
            Logs.log("SAPIGame.doMove: must have fieldTypeId", Logs.LEVEL_WARNING, gameId);
            return;
        }
        if (x == undefined || typeof x != 'number') {
            Logs.log("SAPIGame.doMove: must have x with type number", Logs.LEVEL_WARNING, x);
            return;
        }
        if (y == undefined || typeof y != 'number') {
            Logs.log("SAPIGame.doMove: must have y with type number", Logs.LEVEL_WARNING, y);
            return;
        }
        if (checkWinner == undefined || typeof checkWinner != 'boolean') {
            Logs.log("SAPIGame.doMove: must have checkWinner with type boolean", Logs.LEVEL_WARNING, [checkWinner, typeof checkWinner]);
            return;
        }
        ActionsXO.doMove(cntx.userId, gameId, x, y, checkWinner);
    };
};
/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();
