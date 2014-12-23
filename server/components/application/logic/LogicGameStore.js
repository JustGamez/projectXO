LogicGameStore = function () {

    var memory = {};

    /**
     * Обновляем игру.
     * @param game {Object} объект игры.
     */
    this.save = function (game) {
        memory[game.id] = game;
    };

    /**
     * Возвращаем игру.
     * @param gameId {Number} id игры.
     * @returns {*}
     */
    this.load = function (gameId) {
        if (!memory[gameId])return null;
        return memory[gameId];
    };

    /**
     * Вернуть id всех игр в сторе для игрока.
     * @param userId {Number} id юзера.
     */
    this.getIdsForUserId = function (userId) {
        var game, gameIds = [];
        for (var i in memory) {
            game = memory[i];
            if (game.creatorUserId == userId)gameIds.push(game.id);
            if (game.joinerUserId == userId)gameIds.push(game.id);
        }
        return gameIds;
    };

    /**
     * Удалим игру из стора.
     * @param gameId {Number} id игры.
     */
    this.delete = function (gameId) {
        delete memory[gameId];
    };
};

/**
 * Константный класс.
 * @type {LogicGameStore}
 */
LogicGameStore = new LogicGameStore();
