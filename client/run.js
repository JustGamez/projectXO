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
        level: Logs.LEVEL_WARNING
    });

    /**
     * Id-ишники профайлера.
     * и таймер профайлера.
     */
    /* SAPIUser */
    Profiler.ID_SAPIUSER_AUTHORIZATION_BY_VK = Profiler.getNewId("ID_SAPIUSER_AUTHORIZATION_BY_VK");
    Profiler.ID_SAPIUSER_SEND_USER_INFO = Profiler.getNewId("ID_SAPIUSER_SEND_USER_INFO");
    Profiler.ID_SAPIUSER_UPDATE_USER_SOCNET_INFO = Profiler.getNewId("ID_SAPIUSER_UPDATE_USER_SOCNET_INFO");
    Profiler.ID_SAPIUSER_SEND_FRIENDS = Profiler.getNewId("ID_SAPIUSER_SEND_FRIENDS");
    Profiler.ID_SAPIUSER_SENDME_ONLINE_COUNT = Profiler.getNewId("ID_SAPIUSER_SENDME_ONLINE_COUNT");
    /* SAPIChat */
    Profiler.ID_SAPICHAT_GET_LAST_MESSAGES = Profiler.getNewId("ID_SAPICHAT_GET_LAST_MESSAGES");
    Profiler.ID_SAPICHAT_SEND_MESSAGE = Profiler.getNewId("ID_SAPICHAT_SEND_MESSAGE");
    /* SAPIUserState */
    Profiler.ID_SAPIUSERSTATE_IS_BUSY = Profiler.getNewId("ID_SAPIUSERSTATE_IS_BUSY");
    Profiler.ID_SAPIUSERSTATE_IS_NO_BUSY = Profiler.getNewId("ID_SAPIUSERSTATE_IS_NO_BUSY");
    Profiler.ID_SAPIUSERSTATE_ON_GAME = Profiler.getNewId("ID_SAPIUSERSTATE_ON_GAME");
    /* SAPIInvites */
    Profiler.ID_SAPIINVITES_SEND = Profiler.getNewId("ID_SAPIINVITES_SEND");
    /* LogicUser */
    Profiler.ID_LOGIC_USER_SEND_TO_ALL = Profiler.getNewId("ID_LOGIC_USER_SEND_TO_ALL");
    /* WebSocketServer */
    Profiler.ID_WEBSOCKETSERVER_SEND_IMAGE = Profiler.getNewId("ID_WEBSOCKETSERVER_SEND_IMAGE");
    Profiler.ID_WEBSOCKETSERVER_SEND_CLIENT_CODE = Profiler.getNewId("ID_WEBSOCKETSERVER_SEND_CLIENT_CODE");
    /* SAPIRating*/
    Profiler.ID_SAPIRATING_SEND_ME_TOP_LIST = Profiler.getNewId("ID_SAPIRATING_SEND_ME_TOP_LIST");
    /* SAPIGame */
    Profiler.ID_SAPIGAME_REQUEST_RANDOM_GAME = Profiler.getNewId("ID_SAPIGAME_REQUEST_RANDOM_GAME");
    Profiler.ID_SAPIGAME_CANCEL_RANDOM_GAME = Profiler.getNewId("ID_SAPIGAME_CANCEL_RANDOM_GAME");
    Profiler.ID_SAPIGAME_DO_MOVE = Profiler.getNewId("ID_SAPIGAME_DO_MOVE");
    /* ActionsRandomGame */
    Profiler.ID_ACTIONSRANDOMGAME_CREATE_WAITER = Profiler.getNewId("ID_ACTIONSRANDOMGAME_CREATE_WAITER");
    Profiler.ID_ACTIONSRANDOMGAME_CREATE_RANDOM_GAME = Profiler.getNewId("ID_ACTIONSRANDOMGAME_CREATE_RANDOM_GAME");
    /* SAPIRobot */
    Profiler.ID_SAPIROBOT_CREATE_GAME = Profiler.getNewId("ID_SAPIROBOT_CREATE_GAME");
    Profiler.ID_SAPIROBOT_DO_MOVE = Profiler.getNewId("ID_SAPIROBOT_DO_MOVE");
    Profiler.ID_SAPIROBOT_CHECKWINNER = Profiler.getNewId("ID_SAPIROBOT_CHECKWINNER");
    Profiler.ID_SAPIROBOT_CLOSE_GAME = Profiler.getNewId("ID_SAPIROBOT_CLOSE_GAME");
    /* LogicXO */
    Profiler.LOGIC_XO_FIND_WIN_LINE = Profiler.getNewId("LOGIC_XO_FIND_WIN_LINE");

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
        SAPIRepeatGame: true,

        CAPIChat: true,
        CAPIGame: true,
        CAPIInvites: true,
        CAPIRating: true,
        CAPIUser: true,
        CAPIUserState: true
    });
    /* setInterval(ApiRouterMetrics.printMetrics, 5000); */

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
