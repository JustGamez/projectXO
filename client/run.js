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
        Invites: {
            inviteTimeout: 12000,
            letsPlaytimeout: 10000
        }
    };

    /**
     * Настройка лога.
     */
    Logs.setup({
        level: Logs.LEVEL_DETAIL
    });

    /** init some cpomopnents */
    SocNet.initVK();
    GUI.init();

    /* WebSocket Client */
    webSocketClient = new WebSocketClient();
    webSocketClient.setup({
        host: '192.168.205.2',
        port: 80
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
    // setInterval(ApiRouterMetrics.printMetrics, 5000);

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
        LogicUser.authorize();
    };
    webSocketClient.onDisconnect = apiRouter.onDisconnect;

    /* PageController */
    pageController = new PageController;
    PageController.PAGE_ID_BACKGROUND = 1;
    pageController.addPage(PageController.PAGE_ID_BACKGROUND, new PageBackground());
    PageController.PAGE_ID_MAIN = 2;
    pageController.addPage(PageController.PAGE_ID_MAIN, new PageMain());
    PageController.PAGE_ID_XO_GAME = 3;
    pageController.addPage(PageController.PAGE_ID_XO_GAME, new PageXOGame());
    PageController.PAGE_ID_RATING = 4;
    pageController.addPage(PageController.PAGE_ID_RATING, new PageRating());

    pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_MAIN]);

    /* client specific code */
    SocNet.parseSocNetURL();

    /* running */
    webSocketClient.run();
};
