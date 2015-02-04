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

    this.getRunGames = function () {
        var out;
        out = new Array();
        for (var i in games) {
            if (games[i].status == LogicXO.STATUS_RUN) {
                out.push(games[i]);
            }
        }
        return out;
    }
};

/**
 * Статичный класс.
 * @type {DataGames}
 */
DataGames = new DataGames();