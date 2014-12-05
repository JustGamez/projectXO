LogicUser = function () {

    var userToCntx = {};

    var userAddCntx = function (user, cntx) {
        if (!userToCntx[user.id]) {
            userToCntx[user.id] = [];
        }
        userToCntx[user.id].push(cntx);
    };

    var getUserCntxList = function (userId) {
        return userToCntx[userId];
    };

    this.authorizeByVK = function (socNetUserId, authParams, cntx) {
        var socNetTypeId = SocNet.TYPE_VK;
        var checkResult = SocNet.checkAuth(socNetTypeId, socNetUserId, authParams);

        if (!checkResult) {
            Logs.log("LogicUser: cant auth, SocNet.checkAuth failed.", Logs.LEVEL_WARNING, {
                socNeUserId: socNetUserId,
                authParams: authParams
            });
            return;
        }
        if (!checkResult)return;
        // get from db
        DataUser.getFromSocNet(socNetTypeId, socNetUserId, function (user) {
            authorizeOrCreate(user, socNetTypeId, socNetUserId, cntx);
        });
    };

    var authorizeOrCreate = function (user, socNetTypeId, socNetUserId, cntx) {
        // if not exists create user
        if (!user) {
            DataUser.createFromSocNet(socNetTypeId, socNetUserId, function (user) {
                authorizeSendSuccess(user, cntx);
            });
        } else {
            authorizeSendSuccess(user, cntx);
        }
    };

    var authorizeSendSuccess = function (user, cntx) {
        // тут мы запомним его connectionId раз и на всегда
        cntx.userId = user.id;
        userAddCntx(user, cntx);
        CAPIUser.authorizeSuccess(user.id, user.id);
    };

    this.sendToUser = function (userId, group, method, arguments) {
        var cntxList = getUserCntxList(userId);
        apiRouter.executeRequest(group, method, arguments, cntxList);
    };
};

/**
 * Константный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();