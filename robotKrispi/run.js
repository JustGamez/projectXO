window.onload = function () {

    /* Эмуляция совместимости клиентского и серверного кода. */
    GLOBAL = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!");
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };

    /**
     * Конфигурация, вынести в отдельный файл.
     * @type {Object}
     */
    Config = {
        intensivityInterval: 1500,
        onlinePassiveUsers: 10,
        ApiRouterMetricsReportnterval: 50000
    };

    /**
     * Настройки логов.
     */
    Logs.setup({
        level: Logs.LEVEL_ERROR
    });

    /* ApiRouterMetrics */
    ApiRouterMetrics.setup({
        SAPIUser: true,
        SAPIGame: true,
        SAPIChat: true,
        SAPIRobotGame: true,
        SAPIInvites: true,
        SAPIUserState: true,
        SAPIRating: true,

        CAPIChat: true,
        CAPIGame: true,
        CAPIInvites: true,
        CAPIRating: true,
        CAPIUser: true,
        CAPIUserState: true
    });
    setInterval(ApiRouterMetrics.printMetrics, Config.ApiRouterMetricsReportnterval);

    /**
     * Просто подключение, авторизованного пользователя, для эмитации множества онлайн-пользователей.
     * Сервер будет перенаправлять им широковещательные данные, что может играть роль в нагрузке.
     * @param afterInitCallback
     */
    var createPassiveUser = function (afterInitCallback) {
        var result = createConnection(function () {
            LogicKrispiRobot.authorize(function () {
                console.log("Passive user created");
                afterInitCallback();
            });
        });
        apiRouter = result.apiRouter;
        result.webSocketClient.run();
    };
    /* Создаём пасивных юзеров .*/
    for (var i = 0; i < Config.onlinePassiveUsers; i++) {
        sequencedInit(createPassiveUser);
    }
    /* А тут мы уже запустим роботоа криспи. */
    sequencedInit(function (afterInitCallback) {
        var result = createConnection(function () {
            LogicKrispiRobot.main();
        });
        apiRouter = result.apiRouter;
        result.webSocketClient.run();
        afterInitCallback();
    });

    /**
     * Создать подключение.
     * @returns {{webSocketClient: (WebSocketClient|*), apiRouter: (ApiRouter|*)}}
     */
    function createConnection(onConnect) {
        var webSocketClient, apiRouter;
        /* WebSocket Client */
        webSocketClient = new WebSocketClient();
        webSocketClient.setup({
            host: 'krestiki-noliki.net',
            port: 443
        });
        /* ApiRouter */
        apiRouter = new ApiRouter();
        apiRouter.setMap({
            CAPIUser: CAPIUser,
            CAPIGame: CAPIGame,
            CAPIChat: CAPIChat,
            CAPIInvites: CAPIInvites,
            CAPIUserState: CAPIUserState,
            CAPIRating: CAPIRating
        });
        /* Link ApiRouter and WebSocketClient */
        apiRouter.sendData = webSocketClient.sendData;
        webSocketClient.onData = apiRouter.onData;
        webSocketClient.onConnect = function (connectionId) {
            apiRouter.onConnect(connectionId);
            onConnect();
        };
        webSocketClient.onDisconnect = apiRouter.onDisconnect;
        return {
            webSocketClient: webSocketClient,
            apiRouter: apiRouter
        };
    }
};
