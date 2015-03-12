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
        result_field: null,
        status: null,
        winnerId: null
    };

    /**
     * Вернуть игру по id.
     * @param id {Number} id игры
     * @param callback
     */
    this.getById = function (id, callback) {
        DB.queryWhere(tableName, {
            id: [id]
        }, function (rows) {
            rows[0].field = JSON.parse(rows[0].field);
            callback(rows[0] || null);
        });
    };

    /**
     * Возвращает список игр по параметрам.
     * @param where {object} фильтр.
     * @param callback
     */
    this.getListWhere = function (where, callback) {
        DB.queryWhere(tableName, where, function (rows) {
            for (var i in rows) {
                rows[i].field = JSON.parse(rows[i].field);
            }
            callback(rows);
        });
    };

    /**
     * Сохраняет игру.
     * @param game {object}
     * @param callback {function}
     */
    this.save = function (game, callback) {
        var data;
        data = {
            creatorUserId: game.creatorUserId,
            joinerUserId: game.joinerUserId,
            creatorSignId: game.creatorSignId,
            joinerSignId: game.joinerSignId,
            fieldTypeId: game.fieldTypeId,
            isRandom: game.isRandom,
            isInvitation: game.isInvitation,
            vsRobot: game.vsRobot,
            XUserId: game.XUserId,
            OUserId: game.OUserId,
            turnId: game.turnId,
            field: JSON.stringify(game.field),
            status: game.status,
            winnerId: game.winnerId
        };
        if (game.id) {
            data.id = game.id;
            DB.update(tableName, data, function (result) {
                callback(game);
            });
        } else {
            DB.insert(tableName, data, function (result) {
                game.id = result.insertId;
                callback(game);
            });
        }
    };

    this.getLastId = function (callback) {
        DB.query("SELECT MAX(id) as maxId FROM " + tableName, function (result) {
            callback(result[0].maxId ? result[0].maxId : 0);
        });
    };
};

/**
 * Статичный класс.
 * @type {DataGame}
 */
DataGame = new DataGame();