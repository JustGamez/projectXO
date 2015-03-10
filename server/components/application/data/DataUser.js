DataUser = function () {

    var tableName = 'users';
    var fields = {
        id: null,
        firstName: null,
        lastName: null,
        socNetUserId: null,
        socNetTypeId: null,
        createTimestamp: null,
        lastLoginTimestamp: null,
        score15x15vsPerson: null,
        score3x3vsPerson: null,
        score15x15vsRobot: null,
        score3x3vsRobot: null
    };

    var fromDBToData = function (data) {
        if (!data) return data;
        if (data.id) data.id = parseInt(data.id);
        if (data.socNetTypeId) data.socNetTypeId = parseInt(data.socNetTypeId);
        if (data.socNetUserId) data.socNetUserId = parseInt(data.socNetUserId);
        return data;
    };

    /**
     * Вернуть пользователя по данным из соцаильной сети
     * @param socNetTypeId тип социальнйо сети SocNet.TYPE_*
     * @param socNetUserId id пользователя в социальной сети.
     * @param callback
     */
    this.getFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        DB.queryWhere(tableName, {
            socNetTypeId: [socNetTypeId],
            socNetUserId: [socNetUserId]
        }, function (rows) {
            callback(fromDBToData(rows[0]) || null);
        });
    };

    /**
     * Вернуть пользователя по id.
     * @param userId внутрений id пользовтаеля.
     * @param callback
     */
    this.getById = function (userId, callback) {
        DB.queryWhere(tableName, {
            id: [userId]
        }, function (rows) {
            callback(fromDBToData(rows[0]) || null);
        });
    };

    var waitForCreateByScoNet = [];
    /**
     * Создать пользователя по данным из социальной сети.
     * @param socNetTypeId id социальной сети SocNet.TYPE_*
     * @param socNetUserId id в социальнйо сети.
     * @param callback
     */
    this.createFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        /* Предотвращение двойной мгновенной регистрации. */
        if (waitForCreateByScoNet[socNetUserId])return;
        waitForCreateByScoNet[socNetUserId] = true;
        DB.insert(tableName, {
            firstName: '',
            lastName: '',
            socNetTypeId: socNetTypeId,
            socNetUserId: socNetUserId,
            createTimestamp: new Date().getTime(),
            lastLoginTimestamp: new Date().getTime(),
            score15x15vsPerson: 0,
            score3x3vsPerson: 0,
            score15x15vsRobot: 0,
            score3x3vsRobot: 0
        }, function (result) {
            var user = {
                id: parseInt(result.insertId),
                firstName: '',
                lastName: '',
                socNetTypeId: parseInt(socNetTypeId),
                socNetUserId: parseInt(socNetUserId),
                createTimestamp: new Date().getTime(),
                lastLoginTimestamp: new Date().getTime(),
                score15x15vsPerson: 0,
                score3x3vsPerson: 0,
                score15x15vsRobot: 0,
                score3x3vsRobot: 0
            };
            callback(user);
            delete waitForCreateByScoNet[socNetUserId];
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
            photo50: user.photo50
        };
        DB.update(tableName, data, function (result) {
            callback(user);
        });
    };
};

/**
 * Статичный класс.
 * @type {DataUser}
 */
DataUser = new DataUser();