var nodemailer = require('nodemailer');

LogicUser = function () {
    var self = this;
    var userToCntx = {};
    var userToCntxCount = 0;

    /**
     * Константа, пол: неизвестен\неустановлен.
     * @type {number}
     */
    this.SEX_UNKNOWN = 1;
    /**
     * Константа, пол: женский.
     * @type {number}
     */
    this.SEX_WOMAN = 2;
    /**
     * Константа, пол: мужской.
     * @type {number}
     */
    this.SEX_MAN = 3;

    this.init = function (afterInitCallback) {
        apiRouter.addOnDisconnectCallback(onDisconnectOrFailedSend);
        apiRouter.addOnFailedSendCallback(onDisconnectOrFailedSend);
        Logs.log("LogicUser inited.", Logs.LEVEL_NOTIFY);
        afterInitCallback();
    };

    /**
     * Авторизация пользователя из соц сети вКонтакте.
     * @param socNetUserId
     * @param authParams
     * @param cntx
     */
    this.authorizeByVK = function (socNetUserId, authParams, cntx) {
        var socNetTypeId = SocNet.TYPE_VK;
        socNetUserId = parseInt(socNetUserId);
        if (isNaN(socNetUserId)) {
            Logs.log("LogicUser: cant auth, SocNet.checkAuth failed. (VK), socNetUserId is not a number", Logs.LEVEL_WARNING, {
                socNeUserId: socNetUserId,
                authParams: authParams
            });
            return;
        }
        var checkResult = SocNet(socNetTypeId).checkAuth(socNetUserId, authParams);
        if (!checkResult) {
            Logs.log("LogicUser: cant auth, SocNet.checkAuth failed. (VK)", Logs.LEVEL_WARNING, {
                socNeUserId: socNetUserId,
                authParams: authParams
            });
            return;
        }
        if (!checkResult) return;
        var prid = Profiler.start(Profiler.ID_AUTH_VK);
        /* get from db */
        DataUser.getFromSocNet(socNetTypeId, socNetUserId, function (user) {
            authorizeOrCreate(user, socNetTypeId, socNetUserId, cntx, prid, Profiler.ID_AUTH_VK);
        });
    };

    /**
     * @todo authorization is equal authorizeByVK! is it reusable code
     * @param socNetUserId {int}
     * @param authParams {Object}
     * @param cntx {Object}
     */
    this.authorizeByStandalone = function (socNetUserId, authParams, cntx) {
        var socNetTypeId = SocNet.TYPE_STANDALONE;
        socNetUserId = parseInt(socNetUserId);
        if (isNaN(socNetUserId)) {
            Logs.log("LogicUser: cant auth, SocNet.checkAuth failed. (VK), socNetUserId is not a number", Logs.LEVEL_WARNING, {
                socNeUserId: socNetUserId,
                authParams: authParams
            });
            return;
        }
        var checkResult = SocNet(socNetTypeId).checkAuth(socNetUserId, authParams);
        if (!checkResult) {
            Logs.log("LogicUser: cant auth, SocNet.checkAuth failed.(Standalone)", Logs.LEVEL_WARNING, {
                socNetUserId: socNetUserId,
                authParams: authParams
            });
        }
        if (!checkResult) return;
        var prid = Profiler.start(Profiler.ID_AUTH_STANDALONE);
        /* get from db */
        DataUser.getFromSocNet(socNetTypeId, socNetUserId, function (user) {
            authorizeOrCreate(user, socNetTypeId, socNetUserId, cntx, prid, Profiler.ID_AUTH_STANDALONE);
        });
    };

    var authorizeOrCreate = function (user, socNetTypeId, socNetUserId, cntx, prid, profilerType) {
        /* if not exists create user */
        if (!user) {
            createUser(socNetTypeId, socNetUserId, function (user) {
                authorizeSendSuccess(user, cntx, prid, profilerType);
            })
        } else {
            authorizeSendSuccess(user, cntx, prid, profilerType);
        }
    };

    /**
     * Создаёт юзера по данным социальной сети.
     * @param socNetTypeId {Number} id социальной сети, LogicUser.SocNet.TYPE_*.
     * @param socNetUserId {Number} id юзера в социальной сети.
     * @param callback {Function} будет вызван после создания пользователя.
     */
    var createUser = function (socNetTypeId, socNetUserId, callback) {
        DataUser.createFromSocNet(socNetTypeId, socNetUserId, function (user) {
            callback(user);
            LogicRating.onUserCreated(user);
        });
    };

    /**
     * Отправить уведомомление клиенту, что авторизация прошла успешно.
     * @param user {Object} инфо пользователя.
     * @param cntx {Object} контекст соединения.
     * @param prid {int} id профелируйщего таймера
     * @param profilerType {int} id профайлера.
     * @todo prid and profilerType conflited by means..
     */
    var authorizeSendSuccess = function (user, cntx, prid, profilerType) {
        /* тут мы запомним его connectionId раз и на всегда */
        Statistic.add(user.id, Statistic.ID_AUTHORIZE);
        userAddConn(user, cntx);
        sendOnlineCountToAll(user.id, true);
        CAPIUser.authorizeSuccess(user.id, user.id);
        Profiler.stop(profilerType, prid);
        refreshUserSocNetInfo(user, function (user) {
        });

        Logs.log('Send email', Logs.LEVEL_NOTIFY);

        setTimeout(function () {
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: Config.Mail.user,
                    pass: Config.Mail.password,
                }
            });

            var mailOptions = {
                from: 'a.f.larionov2@gmail.com',
                to: 'a.f.larionov@gmail.com',
                subject: 'User in id:' + user.id + ' ' + user.firstName + ' ' + user.lastName,
                html: 'Login:' +
                '<br>' + 'exists:' + Math.round((mtime() - user.createTimestamp) / 1000 / 3600 / 24) +
                '<br>' + 'https://vk.com/krestik.nolik' +
                '<br>' + 'https://vk.com/' + user.socNetUserId +
                '<br>' + 'user.id=' + user.id +
                '<br>' + 'firstName:' + user.firstName +
                '<br>' + 'lastName:' + user.lastName +
                '<br>' + 'socNetUserId:' + user.socNetUserId +
                '<br>' + 'score15x15vsPerson:' + user.score15x15vsPerson +
                '<br>' + 'score3x3vsPerson:' + user.score3x3vsPerson +
                '<br>' + 'score15x15vsRobot:' + user.score15x15vsRobot +
                '<br>' + 'score3x3vsRobot:' + user.score3x3vsRobot +
                '<br>' + 'lastLoginTimestamp:' + user.lastLoginTimestamp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }, 300);
    };


    /**
     * Отправка информации о пользователе.
     * @param toUserId {Number} кому отправляем.
     * @param userId {Number} данные о каком пользователе.
     */
    this.sendUserInfo = function (userId, toUserId) {
        var prid = Profiler.start(Profiler.ID_SEND_USER_INFO);
        DataUser.getById(userId, function (user) {
            if (user) {
                user.online = self.isUserOnline(user.id);
                user.isBusy = self.isUserBusy(user.id);
                user.onGameId = self.isUserOnGame(user.id);
                user.vsRobot = self.isUserVsRobot(user.id);
                CAPIUser.updateUserInfo(toUserId, user);
                Profiler.stop(Profiler.ID_SEND_USER_INFO, prid);
                if (user.socNetUpdated <= time() - Config.SocNet.refreshInfoTimeout) {
                    refreshUserSocNetInfo(user, function (user) {
                        user.online = self.isUserOnline(user.id);
                        user.isBusy = self.isUserBusy(user.id);
                        user.onGameId = self.isUserOnGame(user.id);
                        user.vsRobot = self.isUserVsRobot(user.id);
                        CAPIUser.updateUserInfo(toUserId, user);
                    });
                }
            } else {
                Logs.log("LogicUser.sendUserInfo. User not found: id=" + userId, Logs.LEVEL_WARNING);
                Profiler.stop(Profiler.ID_SEND_USER_INFO, prid);
            }
        });
    };

    /**
     * Обновление данных из социальной сети для пользователя.
     * @param user
     * @param callback
     */
    var refreshUserSocNetInfo = function (user, callback) {
        var prid = Profiler.start(Profiler.ID_UPDATE_SOCNET_INFO);
        SocNet(user.socNetTypeId).getUserInfo(user.socNetUserId, function (info) {
            user.firstName = info.firstName;
            user.lastName = info.lastName;
            user.photo50 = info.photo50;
            user.socNetUpdated = time();
            switch (info.sex) {
                case SocNet.SEX_MAN:
                    user.sex = LogicUser.SEX_MAN;
                    break;
                case SocNet.SEX_WOMAN:
                    user.sex = LogicUser.SEX_WOMAN;
                    break;
                default:
                    user.sex = LogicUser.SEX_UNKNOWN;
            }
            DataUser.save(user, function (user) {
                if (callback) {
                    Profiler.stop(Profiler.ID_UPDATE_SOCNET_INFO, prid);
                    callback(user);
                }
            });
        });
    };

    /**
     * Отправка списка друзей в соединение.
     * @param userId {Number}
     * @param cntx {object} контекст соединения
     */
    this.sendFriends = function (userId, cntx) {
        var prid = Profiler.start(Profiler.ID_SEND_FRIENDS);
        DataUser.getById(userId, function (user) {
            if (user) {
                SocNet(user.socNetTypeId).getFriends(user.socNetUserId, function (friends) {
                    if (friends == undefined || friends.length == 0) {
                        CAPIUser.updateFriends(cntx.userId, userId, []);
                        Profiler.stop(Profiler.ID_SEND_FRIENDS, prid);
                        return;
                    } else {
                        DataUser.getListWhere({
                            socNetTypeId: [user.socNetTypeId],
                            socNetUserId: [friends, DB.WHERE_IN]
                        }, function (rows) {
                            var ids = [];
                            for (var i in rows) {
                                ids.push(rows[i].id);
                            }
                            CAPIUser.updateFriends(cntx.userId, userId, ids);
                            Profiler.stop(Profiler.ID_SEND_FRIENDS, prid);
                        });
                    }
                });
            } else {
                Logs.log("user not found: id=" + userId, Logs.LEVEL_WARNING);
                Profiler.stop(Profiler.ID_SEND_FRIENDS, prid);
            }
        })
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
     * Отправить всем.
     * @param capiFunction {Function} CAPI-функция, CAPI{groupName}.{functionName}.
     * @param arg1 {*} любой параметр, будет передан в CAPI-функцию 1-ым.
     * @param arg2 {*} любой параметр, будет передан в CAPI-функцию 2-ым.
     * @param arg3 {*} любой параметр, будет передан в CAPI-функцию 3-ым.
     * @param arg4 {*} любой параметр, будет передан в CAPI-функцию 4-ым.
     * @param arg5 {*} любой параметр, будет передан в CAPI-функцию 5-ым.
     * @param arg6 {*} любой параметр, будет передан в CAPI-функцию 6-ым.
     * @param arg7 {*} любой параметр, будет передан в CAPI-функцию 7-ым
     * @param arg8 {*} любой параметр, будет передан в CAPI-функцию 8-ым.
     */
    this.sendToAll = function (capiFunction, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        var prid = Profiler.start(Profiler.ID_LOGIC_SEND_TO_ALL);
        for (var userId in userToCntx) {
            capiFunction.call(null, userId, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        }
        Profiler.stop(Profiler.ID_LOGIC_SEND_TO_ALL, prid);
    };

    this.getOnlineUserIds = function () {
        var list;
        list = {};
        for (var userId in userToCntx) {
            list[userId] = parseInt(userId);
        }
        return list;
    };

    /**
     * Является ли пользователь онлайн.
     * @param userId {int} id пользователя.
     * @returns {boolean}
     */
    this.isUserOnline = function (userId) {
        return userGetConns(userId) ? true : false;
    };

    this.isUserBusy = function (userId) {
        if (userToCntx[userId] == undefined) return undefined;
        return userToCntx[userId].user.isBusy;
    };

    this.isUserOnGame = function (userId) {
        if (userToCntx[userId] == undefined) return undefined;
        return userToCntx[userId].user.onGameId;
    };

    this.isUserVsRobot = function (userId) {
        if (userToCntx[userId] == undefined) return undefined;
        return userToCntx[userId].user.vsRobot;
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
        var prid = Profiler.start(Profiler.ID_SENDME_ONLINE);
        CAPIUser.updateOnlineCount(cntx.userId, self.getOnlineCount());
        Profiler.stop(Profiler.ID_SENDME_ONLINE, prid);
    };

    /**
     * Отправка всем данных об онлайн пользователях.
     * @param userId {Number}
     * @param direction {Boolean} true - если пользователь вошел в игру, false - если вышел.
     */
    var sendOnlineCountToAll = function (userId, direction) {
        var count;
        count = self.getOnlineCount();
        self.sendToAll(CAPIUser.updateOnlineCount, count, userId, direction);
    };

    /**
     * Добавить пользователю контекст соединения.
     * Так же создаст контекст пользователя, если его нет.
     * @param user
     * @param cntx
     */
    var userAddConn = function (user, cntx) {
        if (!userToCntx[user.id]) {
            Logs.log("CREATE user context. uid:" + user.id + ", cid:" + cntx.connectionId, Logs.LEVEL_DETAIL);
            userToCntx[user.id] = {
                conns: {},
                user: {
                    isBusy: false,
                    onGameId: 0,
                    vsRobot: false,
                    id: user.id
                },
                connsCount: 0
            };
            userToCntxCount++;
        }
        Logs.log("ADD user conn", Logs.LEVEL_DETAIL);
        cntx.userId = user.id;
        cntx.isAuthorized = true;
        cntx.user = userToCntx[user.id].user;
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
        Statistic.add(userId, Statistic.ID_LOGOUT);
        gameIds = DataGame.getCachedRunWaitGamesForUser(userId);
        //@todo remove it fully (LogicWaitersStack)
        LogicWaitersStack.deleteByUserId(userId);
        for (var i in gameIds) {
            ActionsGame.close(userId, gameIds[i], function (game) {
                CAPIGame.updateInfo(LogicXO.getOpponentUserId(game, userId), game);
            });
        }
        Logs.log("User logout. user.id=" + userId, Logs.LEVEL_DETAIL);
        DataUser.updateLastLogout(userId);
    };

    /**
     * это каллбек для определения что соедиение разорвано.
     * и на случай если мы пытаемся отправить данные отконектившемуся клиенту,
     * мы попробуем удалить соединение из контекста пользователя.
     * @param cntx
     */
    var onDisconnectOrFailedSend = function (cntx) {
        if (cntx && cntx.userId) {
            onLogout(cntx.userId);
            userDeleteConn(cntx);
            sendOnlineCountToAll(cntx.userId, false);
        }
    };

    /**
     * Тут мы подразумевает, что пользователь закрыл игру так и не завершив её ничьей, либо победой.
     * @param userId
     * @param game
     */
    this.onGameClose = function (userId, game) {
        if (game.vsRobot) {
            DataUser.getById(userId, function (user) {
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_3X3) {
                    user.robotLevel3x3 -= 100;
                }
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_15X15) {
                    user.robotLevel15x15 -= 100;
                }
                DataUser.save(user, function () {

                });
            });
        }
    };

    this.onGameFinish = function (userId, game) {
        if (game.vsRobot) {
            DataUser.getById(userId, function (user) {
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_3X3) {
                    user.robotLevel3x3 -= 12;
                }
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_15X15) {
                    user.robotLevel15x15 -= 12;
                }
                DataUser.save(user, function () {

                });
            });
        }
    };

    /**
     * Если выиграл. начислим очки.
     * @param userId {int} внутрений id игрока.
     * @param game {Object} объект игры.
     */
    this.onWin = function (userId, game) {
        if (game.vsRobot) {
            Statistic.add(userId, Statistic.ID_WIN_ROBOT);
        }
        if (game.isInvitation) {
            Statistic.add(userId, Statistic.ID_WIN_INVITATION);
        }
        DataUser.getById(userId, function (user) {
            if (user) {
                user.online = self.isUserOnline(user.id);
                user.isBusy = self.isUserBusy(user.id);
                user.onGameId = self.isUserOnGame(user.id);
                user.vsRobot = self.isUserVsRobot(user.id);
                /* В рейтинге учитываются очки, только на поле 15х15 в игре с персонажем. */
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_15X15 && !game.vsRobot) {
                    user.score15x15vsPerson++;
                }
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_3X3 && !game.vsRobot) {
                    user.score3x3vsPerson++;
                }
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_15X15 && game.vsRobot) {
                    user.score15x15vsRobot++;
                    user.robotLevel15x15 += 50;
                }
                if (game.fieldTypeId == LogicXO.FIELD_TYPE_3X3 && game.vsRobot) {
                    user.score3x3vsRobot++;
                    user.robotLevel3x3 += 50;
                }
                /* Отправим новые данные на изменение рейтинга. */
                LogicRating.onPositionScoreUp(user.id, user.score15x15vsPerson, user.score3x3vsPerson, user.score15x15vsRobot, user.score3x3vsRobot);
                DataUser.save(user, function (user) {
                    LogicUser.sendToAll(CAPIUser.updateUserInfo, user);
                });
            } else {
                Logs.log("LogicUser.onWin. User not found: id=" + userId, Logs.LEVEL_WARNING);
            }
        });
    };
}
;

/**
 * Константный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();
