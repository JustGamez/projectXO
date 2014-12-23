LogicGameStore = function () {

    var memory = {};

    /**
     * Обновляем игру.
     * @param game
     */
    this.save = function (game) {
        memory[game.id] = game;
    };

    /**
     * Возвращаем игру.
     * @param gameId
     * @returns {*}
     */
    this.load = function (gameId) {
        return memory[gameId];
    };
};

/**
 * Константный класс.
 * @type {LogicGameStore}
 */
LogicGameStore = new LogicGameStore();
