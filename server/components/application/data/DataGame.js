DataGame = function () {

    var tableName = 'games';

    var fields = {
        id: null,
        creatorUserId: null,
        joinerUserId: null,
        creatorSignId: null,
        joinerSignId: null,
        fieldTypeId: null,
        isRandom: null,
        isInvitation: null,
        vsRobot: null,
        XUserId: null,
        OUserId: null,
        turnId: null,
        field: null,
        status: null,
        winnerId: null,
        copyFromId: null,
        created: null,
        finish: null
    };

    var cache = [];

    /**
     * Вернуть игру по id.
     * @param id {Number} id игры
     * @param callback
     */
    this.getById = function (id, callback) {
        if (cache[id]) {
            callback(cache[id]);
            return;
        }
        DB.queryWhere(tableName, {id: [id]}, function (rows) {
            if (!rows[0]) {
                Logs.log("DataGame.getById game not found", Logs.LEVEL_WARNING, gameId);
                return;
            }
            rows[0].field = uncompressField(rows[0].field);
            cache[id] = rows[0];
            callback(cache[id]);
        });
    };

    /**
     * Сохраняет игру.
     * @param game {object}
     * @param callback {function}
     */
    this.save = function (game, callback) {
        if (!game.id) {
            DB.insert(tableName, game, function (result) {
                game.id = result.insertId;
                cache[game.id] = game;
                callback(game);
            }, fields, {field: compressField});
        } else {
            if (!cache[game.id]) {
                Logs.log("DataGame.save", "game does not exists in cache. strange...", Logs.LEVEL_WARNING, game);
            }
            cache[game.id] = game;
            switch (game.status) {
                // Если статус запущено\ждём, то обновляем в кэше.
                case LogicXO.STATUS_WAIT:
                case LogicXO.STATUS_RUN:
                    callback(game);
                    break;
                // Если статус закрыто\выиграл\ничья, то удаляем из кэша и обновляем в БД.
                case LogicXO.STATUS_CLOSED:
                case LogicXO.STATUS_SOMEBODY_WIN:
                case LogicXO.STATUS_NOBODY_WIN:
                    DB.update(tableName, game, function (result) {
                        callback(game);
                        delete cache[game.id];
                    }, fields, {field: compressField});
                    break;
                default:
                    Logs.log("DataGame.save. unknown games status", Logs.LEVEL_WARNING, game);
                    break;
            }
        }
    };

    var compressField = function (field) {
        return JSON.stringify(field);
    };

    var uncompressField = function (field) {
        return JSON.parse(field);
    };

    this.getCachedRunWaitGamesForUser = function (userId) {
        var out = [];
        cache.forEach(function (game) {
            if (LogicXO.isMember(game, userId)) {
                out.push(game.id);
            }
        });
        return out;
    };

    this.flushCache = function () {
        Logs.log("Flush data game cache begin.");
        cache.forEach(function (game) {
            DB.update(tableName, game, function () {
                delete cache[game.id];
                Logs.log("Game flushed. id:" + game.id + " status:" + game.status);
            }, fields, {field: compressField});
        });
    };
};

/**
 * Статичный класс.
 * @type {DataGame}
 */
DataGame = new DataGame();
