LogicUser = function () {

    this.authorize = function () {
        var socNetUserId, authParams;
        socNetUserId = SocNet.getSocNetUseId();
        authParams = SocNet.getAuthParams();
        SAPIUser.authorizeByVK(socNetUserId, authParams);
    };

    this.authorizeSuccess = function (userId) {
        Logs.log("Authorization success. userId:" + userId, Logs.LEVEL_NOTIFY);
    };
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();