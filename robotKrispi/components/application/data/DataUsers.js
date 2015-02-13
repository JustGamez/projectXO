DataUsers = function () {
    var self = this;

    var appId = '4773365';

    var secretKey = 'hHKCnlntrep2N1tkdQcW';

    this.getUserDataByUserNetId = function (socNetUserId) {
        return {
            socNetUserId: socNetUserId,
            authParams: {
                authKey: md5(appId + '_' + socNetUserId + '_' + secretKey),
                appId: appId
            }
        }
    }
};

/**
 * Статичный класс.
 * @type {DataUsers}
 */
DataUsers = new DataUsers();
