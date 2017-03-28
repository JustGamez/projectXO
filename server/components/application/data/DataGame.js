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

    var lastGamesId = null;
    var notSavedIds = [];

    this.init = function (afterInitCallback) {
        // "SELECT `AUTO_INCREMENT` as autoIncrement FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'xo' AND TABLE_NAME   = 'games';
        DB.query("SELECT MAX(id) as `autoIncrement` FROM games;", function (rows) {
            lastGamesId = rows[0].autoIncrement;
            Logs.log("games.autoincrementId:" + lastGamesId, Logs.LEVEL_NOTIFY);
            afterInitCallback();
        });
        setTimeout(function () {
            DataGame.flushCache(true);
        }, Config.DataGame.checkCacheEvery);
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
            game.id = ++lastGamesId;
            cache[game.id] = game;
            notSavedIds[game.id] = true;
            callback(game);
        } else {
            if (!cache[game.id]) {
                Logs.log("DataGame.save", "game does not exists in cache. strange...", Logs.LEVEL_WARNING, game);
            }
            cache[game.id] = game;
            //@todo remove it after 28.05.2017
            switch (game.status) {
                // Если статус запущено\ждём, то обновляем в кэше.
                case LogicXO.STATUS_WAIT:
                case LogicXO.STATUS_RUN:
                case LogicXO.STATUS_CLOSED:
                case LogicXO.STATUS_SOMEBODY_WIN:
                case LogicXO.STATUS_NOBODY_WIN:
                    break;
                default:
                    Logs.log("DataGame.save. unknown games status", Logs.LEVEL_WARNING, game);
                    break;
            }
            callback(game);
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

    this.flushCache = function (checkCreated) {
        Logs.log("Flush data game cache begin.");
        cache.forEach(function (game) {
            // 5часов если прошло, то сливаем, иначе пусть в кэшэ остается.
            if (checkCreated && (game.created > (time() + Config.DataGame.cacheCreatedKeepSeconds))) {
                return;
            }
            if (game.status == LogicXO.STATUS_RUN) return;
            flushGameById(game.id);
            Logs.log("Game flushed. id:" + game.id + " status:" + game.status);
        });
        setTimeout(function () {
            DataGame.flushCache(true);
        }, Config.DataGame.checkCacheEvery);
    };

    var flushGameById = function (id) {
        var game;
        game = cache[id];
        if (notSavedIds[id]) {
            DB.insert(tableName, game, function (result) {
                    //@todo Cannot read property `insertId` of undefined
                    if (!result) {
                        console.log(game);
                        Logs.log("DataGame.save. result. is undefined, something wrong here", Logs.LEVEL_ERROR, game);
                        return;
                    }
                    if (result.insertId != game.id) {
                        Logs.log("DataGame.save. result. insertId != game.id", Logs.LEVEL_WARNING, game);
                    }
                    delete notSavedIds[game.id];
                    delete cache[game.id];
                }, fields, {field: compressField},
                'flushGameById');
        } else {
            DB.update(tableName, game, function () {
                delete cache[game.id];
            }, fields, {field: compressField});
        }
    }
};

/**
 * Статичный класс.
 * @type {DataGame}
 */
DataGame = new DataGame();
