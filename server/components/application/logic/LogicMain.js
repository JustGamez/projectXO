LogicMain = function () {
    var self = this;

    this.preInit = function (afterCallback) {
        self.setStatisticsIds();
        self.setWebSocketServerMap();
        self.linkWebSocketAndApiRouter();
        afterCallback();
    };

    this.main = function () {

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

    this.setWebSocketServerMap = function () {

        WebSocketServer.setMap({
            '/service/clientCode': LogicClientCodeLoader.getClientCode,  //TODO удалить после изменеия настроек в приложении вКонтаке
            '/service/clientCodeVK': LogicClientCodeLoader.getClientCodeVK,
            '/service/clientCodeStandalone': LogicClientCodeLoader.getClientCodeStandalone,
            '/service/reloadClientCode': LogicClientCodeLoader.reloadClientCode,
            '/service/VKCommentsWidget': LogicClientCodeLoader.getVKCommentsWidget,

            '/service/--status': LogicSystemRequests.getStatus,
            '/service/--statistic': LogicSystemRequests.getStatistic,
            '/service/--shutdown___': LogicSystemRequests.shutdown,
            '/service/--logsSetDetail': LogicSystemRequests.logsSetDetail,
            '/service/--logsSetNotify': LogicSystemRequests.logsSetNotify,
            '/service/--help': function (callback) {
                callback("--status <br>" +
                    "--statistic <br>" +
                    "--logsSetDetail<br>" +
                    "--logsSetNotify<br>" +
                    "--help<br>" +
                    "<br>" +
                    "reloadClientCode<br>" +
                    "clientCodeVK<br>" +
                    "clientCodeStandalone?socNetUserId={socNetUserId}<br>");
            }
        });
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

LogicMain.depends = ['Logs', 'Statistic', 'WebSocketServer', 'ApiRouter'];