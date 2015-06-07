CAPIGame = function () {

    /**
     * Обновить данные об игре
     * @param toUserId {Number} кому отправляем.
     * @param game {Object} данные об игре.
     */
    this.updateInfo = function (toUserId, game) {
        LogicUser.sendToUser(toUserId, 'CAPIGame', 'updateInfo', [game]);
    };

    /**
     * Оповестим, что игра создана.
     * @param toUserId {Number} кому отправляем.
     * @param gameId {Number} данные об игре.
     */
    this.gameCreated = function (toUserId, gameId) {
        LogicUser.sendToUser(toUserId, 'CAPIGame', 'gameCreated', [gameId]);
    };

    this.updateMove = function (toUserId, gameId, x, y, lastTurnTimestamp) {
        LogicUser.sendToUser(toUserId, 'CAPIGame', 'updateMove', [gameId, x, y, lastTurnTimestamp]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();