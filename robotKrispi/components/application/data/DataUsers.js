DataUsers = function () {
    var self = this;

    var appId = '4467180';

    var secretKey = 'X0x2PuCZQbC5wwX0lB5R';

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
