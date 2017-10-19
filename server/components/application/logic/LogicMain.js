LogicMain = function () {
    var self = this;

    var projectPrefix = '';

    this.preInit = function (afterCallback) {
        projectPrefix = Config.Project.name ? '/' + Config.Project.name : '';
        self.setStatisticsIds();
        self.setProfileIds();
        self.setWebSocketServerMap();
        self.linkWebSocketAndApiRouter();
        afterCallback();
    };

    this.main = function () {
        WebSocketServer.run(function () {
        });
        this.setDeInitCallbacks();
    };

    this.setStatisticsIds = function () {

        /* User statistics. */
        Statistic.ID_AUTHORIZE = Statistic.addTitle(1, "авторизация через ВКонтакте ");
        Statistic.ID_LOGOUT = Statistic.addTitle(2, "покинул игру.");
        Statistic.ID_DO_MOVE = Statistic.addTitle(3, "сделал ход");
        Statistic.ID_REQUEST_RANDOM_GAME = Statistic.addTitle(4, "запрос случайной игры");
        Statistic.ID_CLOSE_GAME = Statistic.addTitle(5, "закрыл игру");
        Statistic.ID_REPEAT_GAME = Statistic.addTitle(6, "повтор игры");
        Statistic.ID_GAME_ROBOT_CREATE = Statistic.addTitle(7, "создал игру с роботом");
        Statistic.ID_GAME_ROBOT_CLOSE = Statistic.addTitle(8, "закрыл игру с роботом");
        Statistic.ID_CLICK_RATING = Statistic.addTitle(9, "нажал кнопку рейтинга");
        Statistic.ID_CLICK_INVITE_DIALOG = Statistic.addTitle(10, "открыл диалог приглашения друзей");
        Statistic.ID_WIN_ROBOT = Statistic.addTitle(11, "выиграл у робота");
        Statistic.ID_CLICK_HELP = Statistic.addTitle(12, "нажал кнопку помощь");
        Statistic.ID_CHAT_SEND_MESSAGE = Statistic.addTitle(13, "оптравил сообщеие");
        Statistic.ID_WIN_INVITATION = Statistic.addTitle(14, "выиграл в игре по приглашению");
        Statistic.ID_INVITATION_SEND = Statistic.addTitle(15, "оптравил приглашение");
        Statistic.ID_CREATE_GAME_INVATION = Statistic.addTitle(16, "создал игру по приглашению");
        Statistic.ID_LOOK_GAME_START = Statistic.addTitle(17, "начал просмотривать игру");
        Statistic.ID_LOOK_GAME_STOP = Statistic.addTitle(18, "закрыл просмотр игры");
        Statistic.ID_CLICK_RATING_TOP = Statistic.addTitle(19, "клик: рейтинг топ");
        Statistic.ID_CLICK_RATING_MY = Statistic.addTitle(20, "клик: рейтинг мой");
        Statistic.ID_CLICK_RATING_UP = Statistic.addTitle(21, "клик: рейтинг вверх");
        Statistic.ID_CLICK_RATING_DOWN = Statistic.addTitle(22, "клик: рейтинг вниз");
        Statistic.ID_NOTIFIER_SUCCESS = Statistic.addTitle(23, "отправка нотификации: успешно");
        Statistic.ID_NOTIFIER_FAILED = Statistic.addTitle(24, "отправка нотификации: не успешно");
    };

    this.setProfileIds = function () {
        /* SAPIUser  1 */
        Profiler.ID_AUTH_VK = Profiler.addTitle(1, "ID_AUTH_VK");
        Profiler.ID_SEND_USER_INFO = Profiler.addTitle(2, "ID_SEND_USER_INFO");
        Profiler.ID_UPDATE_SOCNET_INFO = Profiler.addTitle(3, "ID_UPDATE_SOCNET_INFO");
        Profiler.ID_SEND_FRIENDS = Profiler.addTitle(4, "ID_SEND_FRIENDS");
        Profiler.ID_SENDME_ONLINE = Profiler.addTitle(5, "ID_SENDME_ONLINE");
        /* SAPIChat */
        Profiler.ID_GET_LAST_MESSAGES = Profiler.addTitle(6, "ID_GET_LAST_MESSAGES");
        Profiler.ID_CHAT_SEND_MESSAGE = Profiler.addTitle(7, "ID_CHAT_SEND_MESSAGE");
        /* SAPIUserState */
        Profiler.ID_USER_IS_BUSY = Profiler.addTitle(8, "ID_USER_IS_BUSY");
        Profiler.ID_USER_IS_NO_BUSY = Profiler.addTitle(9, "ID_USER_IS_NO_BUSY");
        Profiler.ID_USER_ON_GAME = Profiler.addTitle(10, "ID_USER_ON_GAME");
        /* SAPIInvites */
        Profiler.ID_SEND_INVITE = Profiler.addTitle(11, "ID_SEND_INVITE");
        /* LogicUser */
        Profiler.ID_LOGIC_SEND_TO_ALL = Profiler.addTitle(12, "ID_LOGIC_SEND_TO_ALL");
        /* WebSocketServer */
        Profiler.ID_WEBSOCKETSERVER_SEND_IMAGE = Profiler.addTitle(13, "ID_WEBSOCKETSERVER_SEND_IMAGE"); // unused, but id nedded //
        Profiler.ID_WEBSOCKETSERVER_SEND_CLIENT_CODE = Profiler.addTitle(14, "ID_WEBSOCKETSERVER_SEND_CLIENT_CODE");
        /* SAPIRating*/
        Profiler.ID_SAPIRATING_SEND_ME_TOP_LIST = Profiler.addTitle(15, "ID_SAPIRATING_SEND_ME_TOP_LIST");
        /* SAPIGame */
        Profiler.ID_SAPIGAME_REQUEST_RANDOM_GAME = Profiler.addTitle(16, "ID_SAPIGAME_REQUEST_RANDOM_GAME");
        Profiler.ID_SAPIGAME_CANCEL_RANDOM_GAME = Profiler.addTitle(17, "ID_SAPIGAME_CANCEL_RANDOM_GAME");
        Profiler.ID_DO_MOVE = Profiler.addTitle(18, "ID_DO_MOVE");
        /* ActionsGame */
        Profiler.ID_CREATE_WAITER = Profiler.addTitle(19, "ID_CREATE_WAITER");
        Profiler.ID_CREATE_RANDOM_GAME = Profiler.addTitle(20, "ID_CREATE_RANDOM_GAME");
        /* SAPIRobot */
        Profiler.ID_CREATE_ROBOT_GAME = Profiler.addTitle(21, "ID_CREATE_ROBOT_GAME");
        Profiler.ID_ROBOT_DO_MOVE = Profiler.addTitle(22, "ID_ROBOT_DO_MOVE");
        Profiler.ID_ROBOT_CHECKWINNER = Profiler.addTitle(23, "ID_ROBOT_CHECKWINNER");
        Profiler.ID_ROBOT_CLOSE_GAME = Profiler.addTitle(24, "ID_ROBOT_CLOSE_GAME");
        /* LogicXO */
        Profiler.LOGIC_XO_FIND_WIN_LINE = Profiler.addTitle(25, "LOGIC_XO_FIND_WIN_LINE");
        /* ActionsRepeatGame */
        Profiler.ID_REPEATE_GAME = Profiler.addTitle(26, "ID_REPEATE_GAME");
        Profiler.ID_GENERATE_LINES = Profiler.addTitle(27, "ID_GENERATE_LINES");
        /* Rating */
        Profiler.ID_RATING_UPDATE = Profiler.addTitle(28, "ID_RATING_UPDATE");
        Profiler.ID_ROBOT_THINKING = Profiler.addTitle(29, "ID_ROBOT_THINKING");
        Profiler.ID_CHAT_SEND_BEFORE_ID = Profiler.addTitle(30, "ID_CHAT_SEND_BEFORE_ID");
        Profiler.ID_RATING_UPDATE_STEP_1 = Profiler.addTitle(31, "ID_RATING_UPDATE_STEP_1");
        Profiler.ID_RATING_UPDATE_STEP_2 = Profiler.addTitle(32, "ID_RATING_UPDATE_STEP_2");
        Profiler.ID_RATING_UPDATE_STEP_3 = Profiler.addTitle(33, "ID_RATING_UPDATE_STEP_3");
        Profiler.ID_RATING_UPDATE_STEP_4 = Profiler.addTitle(34, "ID_RATING_UPDATE_STEP_4");
        Profiler.ID_WALLPOST_SUM = Profiler.addTitle(35, 'ID_WALLPOST_SUM');
        Profiler.ID_WALLPOST_RECEIVE_DATA = Profiler.addTitle(36, 'ID_WALLPOST_RECEIVE_DATA');
        Profiler.ID_WALLPOST_WRITE_FILE = Profiler.addTitle(37, 'ID_WALLPOST_WRITE_FILE');
        Profiler.ID_WALLPOST_SEND_TO_VK_SERVER = Profiler.addTitle(38, 'ID_WALLPOST_SEND_TO_VK_SERVER');
        Profiler.ID_NOTIFIER_PROCESS_ONE = Profiler.addTitle(39, 'ID_NOTIFIER_PROCESS_ONE');
        Profiler.ID_AUTH_STANDALONE = Profiler.addTitle(40, "ID_AUTH_STANDALONE");
    };

    this.setWebSocketServerMap = function () {

        var map = {};
        map[projectPrefix + '/service/clientCodeVK'] = ClientCodeLoader.getClientCodeVK;
        map[projectPrefix + '/service/clientCodeStandalone'] = ClientCodeLoader.getClientCodeStandalone;
        map[projectPrefix + '/service/reloadClientCode'] = ClientCodeLoader.reloadClientCode;
        map[projectPrefix + '/service/VKCommentsWidget'] = ClientCodeLoader.getVKCommentsWidget;

        map[projectPrefix + '/service/--profiler'] = LogicSystemRequests.getProfiler;
        map[projectPrefix + '/service/--log'] = LogicSystemRequests.getLog;
        map[projectPrefix + '/service/--shutdown___'] = LogicSystemRequests.shutdown;
        map[projectPrefix + '/service/--logsSetDetail'] = LogicSystemRequests.logsSetDetail;
        map[projectPrefix + '/service/--logsSetNotify'] = LogicSystemRequests.logsSetNotify;
        map[projectPrefix + '/service/--help'] = function (callback) {
            callback("--profiler <br>" +
                "--log <br>" +
                "--logsSetDetail<br>" +
                "--logsSetNotify<br>" +
                "--help<br>" +
                "<br>" +
                "reloadClientCode<br>" +
                "clientCodeVK<br>" +
                "clientCodeStandalone?socNetUserId={socNetUserId}<br>");
        };

        console.log(map);
        console.log(map);
        console.log(map);

        WebSocketServer.setMap(map);
    };

    this.linkWebSocketAndApiRouter = function () {

        /* links ApiRouter and webSocketServer */
        ApiRouter.sendData = WebSocketServer.sendData;
        WebSocketServer.onConnect = ApiRouter.onConnect;
        WebSocketServer.onDisconnect = ApiRouter.onDisconnect;
        WebSocketServer.onData = ApiRouter.onData;
    };

    this.setDeInitCallbacks = function () {

        /* set deinit callbacks */
        addDeInitCallback(Statistic.flushCache);
        addDeInitCallback(DataGame.flushCache);
    };
};


LogicMain = new LogicMain;

LogicMain.depends = ['Logs', 'Statistic', 'WebSocketServer', 'ApiRouter', 'DataGame', 'DataUser', 'LogicUser', 'LogicRobot'];