LogicUser = function () {
    var self = this;
    /**
     * Id пользователя под которым мы сидим.
     */
    var authorizedUserId = null;

    /**
     * Тут мы будем хранить данные пользователей.
     * @type {Array}
     */
    var users = [];

    /** Кол-во онлайн пользователей */
    var onlineCount = null;

    /**
     * Авторизация пользователя.
     */
    this.authorize = function () {
        var socNetUserId, authParams;
        socNetUserId = SocNet.getSocNetUseId();
        authParams = SocNet.getAuthParams();
        SAPIUser.authorizeByVK(socNetUserId, authParams);
    };

    /**
     * Метод для обработки ответа от сервера об успешной авторизации.
     * @param userId
     */
    this.authorizeSuccess = function (userId) {
        authorizedUserId = userId;
        Logs.log("Authorization success. userId:" + userId, Logs.LEVEL_NOTIFY);
        var user = LogicUser.getUserById(userId);
        SAPIUser.sendMeOnlineCount();
        SAPIChat.sendMeLastMessages();
        LogicRating.getTopList();
        SAPIUser.sendMeOnlineUserIds();
    };

    /**
     * Авторизован ли текущий юзер.
     * @returns {Boolean}
     */
    this.isAuthorized = function () {
        return authorizedUserId ? true : false;
    };

    /**
     * Возвращает текущего(авторизованного пользователя).
     * @returns {null|Object}
     */
    this.getCurrentUser = function () {
        return this.getUserById(authorizedUserId);
    };

    /**
     * Получить данные пользователя по его id.
     * @param userId
     * @returns {null|Object}
     */
    this.getUserById = function (userId) {
        if (users[userId]) {
            /* Догрузим данные, это немного костыль... но время деньги :) */
            if (!users[userId].socNetUserId) {
                self.loadUserInfoById(userId);
            }
            return users[userId];
        } else {
            self.loadUserInfoById(userId);
            /* некоторая заглушка */
            return {
                id: null,
                firstName: '-',
                lastName: '-',
                isBusy: false,
                onGameId: 0
            };
        }
    };

    /**
     * Запомним, чьи загрузки мы уже ждём, что бы не повторять лишних запросов.
     * @type {Array}
     */
    var waitForLoadingUser = [];

    /**
     * Загрузить данные о пользователе.
     * @param userId {int}
     */
    this.loadUserInfoById = function (userId) {
        if (authorizedUserId == null) {
            return;
        }
        if (!waitForLoadingUser[userId]) {
            waitForLoadingUser[userId] = true;
            SAPIUser.sendMeUserInfo(userId);
        }
    };

    /**
     * Обновить данные о пользователе.
     * Обновит\создаст, только переданные поля!
     * При создании, создаются дефолтовые поля: firstName: '', lastName: '', isBusy: false, onGameId: 0
     * @param user {Object}
     */
    this.updateUserInfo = function (user) {
        waitForLoadingUser[user.id] = false;
        if (users[user.id] == undefined) {
            /* Заглушка */
            users[user.id] = {
                id: user.id,
                firstName: '-',
                lastName: '-',
                isBusy: false,
                onGameId: 0
            };
        }
        for (var paramName in user) {
            users[user.id][paramName] = user[paramName];
        }
        pageController.redraw();
    };

    /** Возвращает количество онлайн игроков. */
    this.getOnlineCount = function () {
        return onlineCount;
    };

    /**
     * Обновим данные о кол-во онлайн пользователей.
     * @param count int кол-во онлайн пользователей.
     * @param userId int
     * @param direction boolean
     */
    this.updateOnlineCount = function (count, userId, direction) {
        if (count > onlineCount) {
            var currentUser = LogicUser.getCurrentUser();
            if (currentUser && currentUser.id && currentUser.id == 1) {
                var audio = new Audio('/sounds/ICQMessage.mp3');
                audio.play();
                //alert("Онлайн +1 !!!");
            }
        }
        onlineCount = count;
        /* Сбрасываем пользователя если он вошел\вышел. */
        self.updateUserInfo({id: userId, online: direction, isBusy: false, onGame: 0});
        pageController.redraw();
    };

    /**
     * Возвращает массив внутрениих id юзееров, которые онлайн.
     */
    this.getOnlineUserIds = function () {
        var out;
        out = [];
        for (var i in users) {
            if (users[i].id && users[i].online) {
                out.push(users[i].id);
            }
        }
        return out;
    };

    var ratingPositions = [];

    this.getRatingPosition = function (userId) {
        if (ratingPositions[userId]) {
            if (ratingPositions[userId].needReload) {
                SAPIUser.sendMeRatingPosition(userId);
            }
            return ratingPositions[userId].position;
        } else {
            SAPIUser.sendMeRatingPosition(userId);
        }
    };

    this.updateRatingPosition = function (userId, position) {
        ratingPositions[userId] = {
            position: position,
            needReload: false
        };
        pageController.redraw();
    };

    this.setRatingPositionsNeedReload = function () {
        for (var userId in ratingPositions) {
            ratingPositions[userId].needReload = true;
        }
        pageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();