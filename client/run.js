window.onload = function () {
    Logs.log('OnLoad raized', Logs.LEVEL_NOTIFY);
    /* Эмуляция совместимости клиентского и серверного кода. */
    GLOBAL = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!");
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };
    Logs.init(function () {
    });

    /** init some cpomopnents */
    SocNet.VKInitClient();
    GUI.init();

    /* WebSocket Client */
    webSocketClient = new WebSocketClient();
    webSocketClient.init(function () {
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
        SAPIStatistic: true,
        SAPIGameLooks: true,

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
    PageController.PAGE_ID_ONLINE_SCORE = 2;
    pageController.addPage(PageController.PAGE_ID_ONLINE_SCORE, new PageOnlineAndRating());
    PageController.PAGE_ID_MAIN = 3;
    pageController.addPage(PageController.PAGE_ID_MAIN, new PageMain());
    PageController.PAGE_ID_XO_GAME = 4;
    pageController.addPage(PageController.PAGE_ID_XO_GAME, new PageXOGame());
    PageController.PAGE_ID_RATING = 5;
    pageController.addPage(PageController.PAGE_ID_RATING, new PageRating());
    PageController.PAGE_ID_CHAT = 6;
    pageController.addPage(PageController.PAGE_ID_CHAT, new PageChat());
    PageController.PAGE_ID_HELP = 7;
    pageController.addPage(PageController.PAGE_ID_HELP, new PageHelp());
    PageController.PAGE_ID_HELP_MAIN_MENU = 8;
    pageController.addPage(PageController.PAGE_ID_HELP_MAIN_MENU, new PageHelpMainMenu());
    PageController.PAGE_ID_HELP_RATING = 9;
    pageController.addPage(PageController.PAGE_ID_HELP_RATING, new PageHelpRating());
    PageController.PAGE_ID_HELP_RULES = 10;
    pageController.addPage(PageController.PAGE_ID_HELP_RULES, new PageHelpRules());

    pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);

    /* client specific code */
    SocNet.parseSocNetURL();

    /* running */
    webSocketClient.run();
};
