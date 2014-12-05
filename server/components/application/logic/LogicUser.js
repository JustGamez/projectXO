LogicUser = function () {

    var userToCntx = {};
    var userToCntxCount = 0;

    this.init = function () {
        apiRouter.addOnDisconnectCallback(onDisconnect);
        apiRouter.addOnFailedSendCallback(onFailedSend);
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
        userAddConn(user, cntx);
        CAPIUser.authorizeSuccess(user.id, user.id);
    };

    this.sendToUser = function (userId, group, method, arguments) {
        var cntxList = userGetConns(userId);
        apiRouter.executeRequest(group, method, arguments, cntxList);
    };

    this.isUserOnline = function (userId) {
        return userGetConns(userId) ? true : false;
    };

    this.getOnlineCount = function () {
        return userToCntxCount;
    };

    var userAddConn = function (user, cntx) {
        var userId = user.id;
        if (!userToCntx[userId]) {
            Logs.log("CREATE user context", Logs.LEVEL_DETAIL);
            userToCntx[userId] = {
                user: user,
                conns: {},
                connsCount: 0
            };
            userToCntxCount++;
        }
        Logs.log("ADD user conn", Logs.LEVEL_DETAIL);
        cntx.userId = userId;
        userToCntx[userId].conns[cntx.connectionId] = cntx;
        userToCntx[userId].connsCount++;
    };

    var userGetConns = function (userId) {
        return userToCntx[userId] ? userToCntx[userId].conns : null;
    };

    var userDeleteConn = function (cntx) {
        var userId = cntx.userId;
        Logs.log("DELETE user conn", Logs.LEVEL_DETAIL);
        delete userToCntx[userId].conns[cntx.connectionId];
        userToCntx[userId].connsCount--;
        if (userToCntx[userId].connsCount == 0) {
            Logs.log("DELETE user Context", Logs.LEVEL_DETAIL);
            delete userToCntx[userId];
            userToCntxCount--;
        }
    };
    /**
     * это каллбек для определения что соедиение разорвано.
     * @param cntx
     */
    var onDisconnect = function (cntx) {
        if (cntx.userId) {
            userDeleteConn(cntx);
        }
    };
    /**
     * это калбек, на случай если мы пытаемся отправить данные отконектившемуся клиенту,
     * мы попробуем удалить соединение из контекста пользователя.
     * @param cntx
     */
    var onFailedSend = function (cntx) {
        if (cntx.userId) {
            userDeleteConn(cntx);
        }
    };
};

/**
 * Константный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();