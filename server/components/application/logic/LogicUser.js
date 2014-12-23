LogicUser = function () {
    var self = this;
    var userToCntx = {};
    var userToCntxCount = 0;

    this.init = function (afterInitCallback) {
        apiRouter.addOnDisconnectCallback(onDisconnect);
        apiRouter.addOnFailedSendCallback(onFailedSend);
        Logs.log("LogicUser inited.", Logs.LEVEL_NOTIFY);
        afterInitCallback();
    };

    /**
     * Авторизация пользвоателя из соц сети вКонтакте.
     * @param socNetUserId
     * @param authParams
     * @param cntx
     */
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
        /* get from db */
        DataUser.getFromSocNet(socNetTypeId, socNetUserId, function (user) {
            authorizeOrCreate(user, socNetTypeId, socNetUserId, cntx);
        });
    };

    /**
     * Отправка информации о пользователе.
     * @param userId {Number}
     * @param cntx {object} контекст соединения
     */
    this.sendUserInfo = function (userId, cntx) {
        DataUser.getById(userId, function (user) {
            if (user) {
                CAPIUser.updateUserInfo(cntx.userId, user);
            } else {
                Logs.log("user not found: id=" + userId, Logs.LEVEL_WARNING);
            }
        });
    };

    /**
     * Отправка списка друзей в соединение.
     * @param userId {Number}
     * @param cntx {object} контекст соединения
     */
    this.sendFriends = function (userId, cntx) {
        DataUser.getById(userId, function (user) {
            if (user) {
                SocNet.getFriends(user.socNetTypeId, user.socNetUserId, function (friends) {
                    DataUser.getListWhere({
                        socNetTypeId: [user.socNetTypeId],
                        socNetUserId: [friends, DB.WHERE_IN]
                    }, function (rows) {
                        var ids = [];
                        for (var i in rows) {
                            ids.push(rows[i].id);
                        }
                        CAPIUser.updateFriends(cntx.userId, userId, ids);
                    });
                });
            } else {
                Logs.log("user not found: id=" + userId, Logs.LEVEL_WARNING);
            }
        })
    };

    var authorizeOrCreate = function (user, socNetTypeId, socNetUserId, cntx) {
        /* if not exists create user */
        if (!user) {
            DataUser.createFromSocNet(socNetTypeId, socNetUserId, function (user) {
                authorizeSendSuccess(user, cntx);
            });
        } else {
            authorizeSendSuccess(user, cntx);
        }
    };

    var authorizeSendSuccess = function (user, cntx) {
        /* тут мы запомним его connectionId раз и на всегда */
        userAddConn(user, cntx);
        sendOnlineCountToAll();
        CAPIUser.authorizeSuccess(user.id, user.id);
    };

    /**
     * Отправить пользователю данные
     * @param userId {int} id пользователя.
     * @param group {string} группу апи.
     * @param method {string} метод апи.
     * @param arguments {Array} аргументы апи.
     */
    this.sendToUser = function (userId, group, method, arguments) {
        var cntxList = userGetConns(userId);
        apiRouter.executeRequest(group, method, arguments, cntxList);
    };

    /**
     * Является ли пользователь онлайн.
     * @param userId id пользователя
     * @returns {boolean}
     */
    this.isUserOnline = function (userId) {
        return userGetConns(userId) ? true : false;
    };

    /**
     * Возвращает кол-во онлайн пользователей.
     * @returns {number} кол-во онлайн пользователей.
     */
    this.getOnlineCount = function () {
        return userToCntxCount;
    };

    /** Отправляем кол-во онлайн пользователей */
    this.sendOnlineCount = function (cntx) {
        CAPIUser.updateOnlineCount(cntx.userId, self.getOnlineCount());
    };

    /**
     * Отправка всем данных об онлайн пользователях.
     */
    var sendOnlineCountToAll = function () {
        for (var userId in userToCntx) {
            CAPIUser.updateOnlineCount(userId, self.getOnlineCount());
        }
    };

    /**
     * Добавить пользователю контекст соединения.
     * Так же создаст контекст пользователя, если его нет.
     * @param user
     * @param cntx
     */
    var userAddConn = function (user, cntx) {
        if (!userToCntx[user.id]) {
            Logs.log("CREATE user context", Logs.LEVEL_DETAIL);
            userToCntx[user.id] = {
                conns: {},
                connsCount: 0
            };
            userToCntxCount++;
        }
        Logs.log("ADD user conn", Logs.LEVEL_DETAIL);
        cntx.userId = user.id;
        cntx.isAuthorized = true;
        userToCntx[user.id].conns[cntx.connectionId] = cntx;
        userToCntx[user.id].connsCount++;
    };

    /**
     * Возвращает массив контекстов соединения пользователя.
     * @param userId
     * @returns {*}
     */
    var userGetConns = function (userId) {
        return userToCntx[userId] ? userToCntx[userId].conns : null;
    };

    /**
     * Удаляет контекст соединения для пользователя.
     * Так же удалит контекст пользователя, если в результате удаления не останется ни одного соединения.
     * @param cntx
     */
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
     * Действия при выходе игрока из игры.
     * @param userId {Number} id пользователя.
     */
    var onLogout = function (userId) {
        var gameIds;
        gameIds = LogicGameStore.getIdsForUserId(userId);
        LogicWaitersStack.deleteByUserId(userId);
        for (var i in gameIds) {
            ActionsXO.closeGame(userId, gameIds[i]);
        }
        Logs.log("User logout. user.id=" + userId, Logs.LEVEL_DETAIL);
    };

    /**
     * это каллбек для определения что соедиение разорвано.
     * @param cntx
     */
    var onDisconnect = function (cntx) {
        if (cntx.userId) {
            onLogout(cntx.userId);
            userDeleteConn(cntx);
            sendOnlineCountToAll();
        }
    };

    /**
     * это калбек, на случай если мы пытаемся отправить данные отконектившемуся клиенту,
     * мы попробуем удалить соединение из контекста пользователя.
     * @param cntx
     */
    var onFailedSend = function (cntx) {
        if (cntx.userId) {
            onLogout(cntx.userId);
            userDeleteConn(cntx);
            sendOnlineCountToAll();
        }
    };
};

/**
 * Константный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();