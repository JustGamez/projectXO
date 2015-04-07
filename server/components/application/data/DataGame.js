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

    var autoIncrementValue = null;
    var notSavedIds = [];

    this.init = function (afterInitCallback) {
        DB.query("SELECT `AUTO_INCREMENT` as autoIncrement FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'xo' AND TABLE_NAME   = 'games';", function (rows) {
            autoIncrementValue = rows[0].autoIncrement;
            Logs.log("games.autoincrementId:" + autoIncrementValue, Logs.LEVEL_NOTIFY);
            afterInitCallback();
        });
    };

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
                Logs.log("DataGame.getById game not found", Logs.LEVEL_WARNING, id);
                return;
            }
            rows[0].field = uncompressField(rows[0].field);
            var game = rows[0];
            if (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN) {
                cache[id] = game;
            }
            callback(game);
        });
    };

    /**
     * Сохраняет игру.
     * @param game {object}
     * @param callback {function}
     */
    this.save = function (game, callback) {
        if (!game.id) {
            game.id = autoIncrementValue++;
            cache[game.id] = game;
            notSavedIds[game.id] = true;
            callback(game);
            setTimeout(function () {
                flushGameById(game.id, false);
            }, 120000);
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
                    callback(game);
                    setTimeout(function () {
                        flushGameById(game.id);
                    }, Config.DataGame.cacheFinishedGameTimeout);
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
            flushGameById(game.id);
            Logs.log("Game flushed. id:" + game.id + " status:" + game.status);
        });
    };

    var flushGameById = function (id, deleteCache) {
        var game;
        if (deleteCache == undefined) {
            deleteCache = true;
        }
        game = cache[id];
        if (notSavedIds[id]) {
            DB.insert(tableName, game, function (result) {
                if (result.insertId != game.id) {
                    Logs.log("DataGame.save. result. insertId != game.id", Logs.LEVEL_WARNING, game);
                }
                delete notSavedIds[game.id];
                if (deleteCache) {
                    delete cache[game.id];
                }
            }, fields, {field: compressField});
        } else {
            DB.update(tableName, game, function () {
                if (deleteCache) {
                    delete cache[game.id];
                }
            }, fields, {field: compressField});
        }
    }
};

/**
 * Статичный класс.
 * @type {DataGame}
 */
DataGame = new DataGame();
