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

    /**
     * Робот сделал ход.
     * @param toUserId {Number} кому отправляем.
     * @param gameId {Number} id игры, в которой бот сделал ход.
     */
    this.robotDoMove = function (toUserId, gameId) {
        LogicUser.sendToUser(toUserId, 'CAPIGame', 'robotDoMove', [gameId]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();