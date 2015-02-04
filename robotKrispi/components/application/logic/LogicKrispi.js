/**
 * Логика робота Криспи.
 * @constructor
 */
LogicKrispiRobot = function () {
    var self = this;

    var onAuthorizeCallback = null;

    this.authorizedUserId = null;
    /**
     * Точка входа, тут всё начнётся :)
     */
    this.main = function () {
        console.log('Krispi running.');
        /**
         * Частота запросов.
         * @type {number}
         */
        KrispiCases.intensivityInterval = Config.intensivityInterval;
        self.authorize(function () {
            KrispiCases.variant1();
        });
    };

    /**
     * Авторизуемся, это нужно всёгда.
     */
    this.authorize = function (afterAuthorizeCallback) {
        onAuthorizeCallback = afterAuthorizeCallback;
        var socNetUserId, authParams, user;
        socNetUserId = self.rnd();
        user = DataUsers.getUserDataByUserNetId(socNetUserId);
        SAPIUser.authorizeByVK(user.socNetUserId, user.authParams);
    };

    /**
     * После авторизации запустим тест.
     */
    this.onAuthorizationSuccess = function (userId) {
        LogicKrispiRobot.authorizedUserId = userId;
        onAuthorizeCallback(userId);
    };

    /**
     * Будем использовать случайные айдишники.
     * @returns {number}
     */
    this.rnd = function () {
        var id;
        id = Math.round(Math.random() * 1500) + 1;
        return id;
    };
};

/**
 * Статичный класс.
 * @type {LogicKrispiRobot}
 */
LogicKrispiRobot = new LogicKrispiRobot();
