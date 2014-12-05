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

    this.getFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        DB.queryWhere(tableName, {
            socNetTypeId: socNetTypeId,
            socNetUserId: socNetUserId
        }, function (rows) {
            callback(rows[0] || null);
        });
    };

    this.createFromSocNet = function (socNetTypeId, socNetUserId, callback) {
        DB.insert(tableName, {
            firstName: '',
            lastName: '',
            socNetUserId: socNetUserId,
            socNetTypeId: socNetTypeId,
            createTimestamp: 1,
            lastLoginTimestamp: 1,
            score: 0
        }, function (result) {
            var user = {
                id: result.insertId,
                firstName: result.firstName,
                lastName: result.lastName,
                socNetUserId: result.socNetUserId,
                socNetTypeId: result.socNetTypeId,
                createTimestamp: result.createTimestamp,
                lastLoginTimestamp: result.lastLoginTimestamp,
                score: result.score
            };
            callback(user);
        });
    }
};

/**
 * Статичный класс.
 * @type {DataUser}
 */
DataUser = new DataUser();