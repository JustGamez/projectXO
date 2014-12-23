CAPIGame = function () {

    /**
     * Обновить данные об игре
     * @param toUserId кому отправляем.
     * @param game данные об игре.
     */
    this.updateInfo = function (toUserId, game) {
        LogicUser.sendToUser(toUserId, 'CAPIGame', 'updateInfo', [game]);
    };

    /**
     * Оповестим, что игра создана.
     * @param toUserId кому отправляем.
     * @param gameId {Number} данные об игре.
     */
    this.gameCreated = function (toUserId, gameId) {
        LogicUser.sendToUser(toUserId, 'CAPIGame', 'gameCreated', [gameId]);
    }
};

/**
 * Констатный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();