/**
 * Логика игры.
 * Тут мы будем обрабатывть всё что связано с игрой, но кроме самих крестиков нуликов.
 * Крестики нулики обрабатываются в LogixXO. А тут всё остальное, в т.ч. хранение игр.
 * @constructor
 */
LogicGame = function () {

    /**
     * Id текущей игры.
     * @type {null}
     */
    var currentGameId = null;

    /**
     * Будем хранить тут данные об игрых.
     * @type {Array}
     */
    var games = [];

    /**
     * Обновить данные об игре.
     * @param game {Object} объект игры.
     */
    this.updateInfo = function (game) {
        games[game.id] = game;
        pageController.redraw();
    };

    /**
     * Установить текущую игру.
     * @param gameId
     */
    this.setCurrentGameId = function (gameId) {
        Logs.log("setCurrentGame:" + gameId, Logs.LEVEL_DETAIL);
        currentGameId = gameId;
        pageController.redraw();
    };

    /**
     * Получить текущую игру.
     */
    this.getCurrentGameId = function () {
        return currentGameId;
    };

    /**
     * Получить текущую игру.
     */
    this.getCurrentGame = function () {
        if (currentGameId && games[currentGameId]) {
            return games[currentGameId];
        } else {
            return null;
        }
    };

    /**
     * Возвращает игру по id, если она конечно есть в "кэшэ".
     * @param gameId {int}
     * @returns {Object}
     */
    this.getGameById = function (gameId) {
        return games[gameId];
    }
};

/**
 * Константный класс.
 * @type {LogicGame}
 */
LogicGame = new LogicGame();