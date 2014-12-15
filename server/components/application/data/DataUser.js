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
        score: null
    };

    /**
     * Вернуть пользователя по данным из соцаильной сети
     * @param socNetTypeId тип социальнйо сети SocNet.TYPE_*
     * @param socNetUserId id пользователя в социальной сети.
     * @param callback
     */
    this.getFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        DB.queryWhere(tableName, {
            socNetTypeId: socNetTypeId,
            socNetUserId: socNetUserId
        }, function (rows) {
            callback(rows[0] || null);
        });
    };

    /**
     * Вернуть пользователя по id.
     * @param userId внутрений id пользовтаеля.
     * @param callback
     */
    this.getById = function (userId, callback) {
        DB.queryWhere(tableName, {
            id: userId
        }, function (rows) {
            callback(rows[0] || null);
        });
    };

    /**
     * Создать пользователя по данным из социальной сети.
     * @param socNetTypeId id социальной сети SocNet.TYPE_*
     * @param socNetUserId id в социальнйо сети.
     * @param callback
     */
    this.createFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        DB.insert(tableName, {
            firstName: '',
            lastName: '',
            socNetTypeId: socNetTypeId,
            socNetUserId: socNetUserId,
            createTimestamp: 1,
            lastLoginTimestamp: 1,
            score: 0
        }, function (result) {
            var user = {
                id: result.insertId,
                firstName: result.firstName,
                lastName: result.lastName,
                socNetTypeId: result.socNetTypeId,
                socNetUserId: result.socNetUserId,
                createTimestamp: result.createTimestamp,
                lastLoginTimestamp: result.lastLoginTimestamp,
                score: result.score
            };
            callback(user);
        });
    };

    /**
     * Возвращает список юзерво по параметрам.
     * @param where {object} фильтр.
     * @param callback
     */
    this.getListWhere = function (where, callback) {
        DB.queryWhere(tableName, where, function (rows) {
            callback(rows);
        });
    };
};

/**
 * Статичный класс.
 * @type {DataUser}
 */
DataUser = new DataUser();