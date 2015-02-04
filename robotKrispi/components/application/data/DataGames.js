DataGames = function () {

    var games = {};

    this.update = function (game) {
        var old;
        if (games[game.id]) {
            old = games[game.id];
        } else {
            old = {
                lastX: 0,
                lastY: 0
            };
        }
        games[game.id] = game;
        games[game.id].lastX = old.lastX;
        games[game.id].lastY = old.lastY;
    };

    this.getAll = function () {
        return games;
    }
};

/**
 * Статичный класс.
 * @type {DataGames}
 */
DataGames = new DataGames();