/**
 * Логика робота Криспи.
 * @constructor
 */
LogicKrispi = function () {
    var self = this;

    this.main = function () {
        self.authorize();
    };

    this.authorize = function () {
        var socNetUserId, authParams, user;


        user = DataUsers.getUserDataByUserNetId(rnd());
        SAPIUser.authorizeByVK(user.socNetUserId, user.authParams);

    };

    this.onAuthorizationSuccess = function () {

        for (var i = 0; i < 1; i++) {
            SAPIUser.sendMeOnlineCount();
            SAPIUser.sendMeUserInfo(rnd());
            SAPIUser.sendMeFriends(rnd());
        }
        SAPIGame.requestRandomGame(1, 1);
    };

    var rnd = function () {
        var id;
        id = Math.round(Math.random() * 1500) + 1;
        return id;
    };
};

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

/**
 * Статичный класс.
 * @type {LogicKrispi}
 */
LogicKrispi = new LogicKrispi();