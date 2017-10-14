DataUser = function () {

    var tableName = 'users';

    var fromDBToData = function (data) {
        if (!data) return data;
        if (data.id) data.id = parseInt(data.id);
        if (data.socNetTypeId) data.socNetTypeId = parseInt(data.socNetTypeId);
        if (data.socNetUserId) data.socNetUserId = parseInt(data.socNetUserId);
        return data;
    };

    var autoIncrementValue = null;

    this.init = function (afterInitCallback) {
        DB.query("SELECT `AUTO_INCREMENT` as autoIncrement FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" + Config.DB.database + "' AND TABLE_NAME   = 'users';", function (rows) {
            autoIncrementValue = rows[0].autoIncrement;
            Logs.log("users.autoincrementId:" + autoIncrementValue, Logs.LEVEL_NOTIFY);
            afterInitCallback();
        });
    };

    /**
     * Вернуть пользователя по данным из соцаильной сети
     * @param socNetTypeId тип социальнйо сети SocNet.TYPE_*
     * @param socNetUserId id пользователя в социальной сети.
     * @param callback
     */
    this.getBySocNet = function (socNetTypeId, socNetUserId, callback) {
        DB.queryWhere(tableName, {
            socNetTypeId: [socNetTypeId],
            socNetUserId: [socNetUserId]
        }, function (rows) {
            callback(fromDBToData(rows[0]) || null);
        });
    };

    var cache = {};
    /**
     * Вернуть пользователя по id.
     * @param userId внутрений id пользовтаеля.
     * @param callback
     */
    this.getById = function (userId, callback) {
        if (cache[userId]) {
            callback(cache[userId]);
            return;
        }
        DB.queryWhere(tableName, {
            id: [userId]
        }, function (rows) {
            cache[userId] = fromDBToData(rows[0]) || null;
            callback(cache[userId]);
        });
    };

    var waitForCreateBySocNet = [];
    /**
     * Создать пользователя по данным из социальной сети.
     * @param socNetTypeId id социальной сети SocNet.TYPE_*
     * @param socNetUserId id в социальнйо сети.
     * @param callback
     */
    this.createFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        /* Предотвращение двойной мгновенной регистрации. */
        if (waitForCreateBySocNet[socNetUserId])return;
        waitForCreateBySocNet[socNetUserId] = true;
        var user = {
            id: autoIncrementValue++,
            firstName: '',
            lastName: '',
            socNetTypeId: parseInt(socNetTypeId),
            socNetUserId: parseInt(socNetUserId),
            createTimestamp: new Date().getTime(),
            lastLoginTimestamp: new Date().getTime(),
            score15x15vsPerson: 0,
            score3x3vsPerson: 0,
            score15x15vsRobot: 0,
            score3x3vsRobot: 0,
            robotLevel3x3: 500,
            robotLevel15x15: 600
        };
        cache[user.id] = user;
        callback(user);
        DB.insert(tableName, user, function (result) {
            if (result.insertId != user.id) {
                Logs.log("DataUser.createFromSocNet. result.insertId != user.id", Logs.LEVEL_FATAL_ERROR);
            }
            delete waitForCreateBySocNet[socNetUserId];
        });
    };

    /**
     * Возвращает список юзеров по параметрам.
     * @param where {object} фильтр.
     * @param callback
     */
    this.getListWhere = function (where, callback) {
        DB.queryWhere(tableName, where, function (rows) {
            callback(rows);
        });
    };

    /**
     * Сохраняет юзера.
     * @param user {Object}
     * @param callback {Function}
     */
    this.save = function (user, callback) {
        var data;
        if (user.robotLevel3x3 < 1) user.robotLevel3x3 = 1;
        if (user.robotLevel3x3 > 10000) user.robotLevel3x3 = 10000;
        if (user.robotLevel15x15 > 10000) user.robotLevel15x15 = 10000;
        if (user.robotLevel15x15 < 1) user.robotLevel15x15 = 1;
        cache[user.id] = user;
        data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            socNetTypeId: user.socNetTypeId,
            socNetUserId: user.socNetUserId,
            createTimestamp: user.createTimestamp,
            lastLoginTimestamp: user.lastLoginTimestamp,
            score15x15vsPerson: user.score15x15vsPerson,
            score3x3vsPerson: user.score3x3vsPerson,
            score15x15vsRobot: user.score15x15vsRobot,
            score3x3vsRobot: user.score3x3vsRobot,
            sex: user.sex,
            photo50: user.photo50,
            socNetUpdated: user.socNetUpdated,
            robotLevel3x3: user.robotLevel3x3,
            robotLevel15x15: user.robotLevel15x15
        };
        callback(user);
        DB.update(tableName, data, function (result) {
        });
    };

    /**
     * Обновить данные о последнем выходе игрока.
     * @param userId {int} внутрений id пользователя.
     */
    this.updateLastLogout = function (userId) {
        if (!userId) {
            Logs.log("DataUser.udpateLastLogout. Must be userId", Logs.LEVEL_WARNING, userId);
            return;
        }
        if (cache[userId]) {
            cache[userId] = null;
        }
        DB.query("UPDATE users SET lastLogoutTimestamp = " + (new Date().getTime()) + " WHERE id = " + userId, function () {
        });
    };
};

/**
 * Статичный класс.
 * @type {DataUser}
 */
DataUser = new DataUser();

DataUser.depends = ['Logs', 'Profiler', 'DB', 'DataGame'];