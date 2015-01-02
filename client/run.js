window.onload = function () {

    // совместимость клиентского и серверного кода.
    GLOBAL = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!")
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };

    /* WebSocket Client */
    webSocketClient = new WebSocketClient();
    webSocketClient.setup({
        host: 'localhost',
        port: 80
    });

    /* ApiRouter */
    apiRouter = new ApiRouter();
    apiRouter.setMap({
        CAPIUser: CAPIUser,
        CAPIGame: CAPIGame,
        CAPIChat: CAPIChat
    });

    /* Link ApiRouter and WebSocketClient */
    apiRouter.sendData = webSocketClient.sendData;
    webSocketClient.onData = apiRouter.onData;
    webSocketClient.onConnect = apiRouter.onConnect;
    webSocketClient.onDisconnect = apiRouter.onDisconnect;

    /* PageController */
    pageController = new PageController;
    PageController.PAGE_ID_BACKGROUND = 1;
    pageController.addPage(PageController.PAGE_ID_BACKGROUND, new PageBackground());
    PageController.PAGE_ID_MAIN = 2;
    pageController.addPage(PageController.PAGE_ID_MAIN, new PageMain());
    PageController.PAGE_ID_XO_GAME = 3;
    pageController.addPage(PageController.PAGE_ID_XO_GAME, new PageXOGame());

    pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_MAIN]);

    // client specific code
    SocNet.parseSocNetURL();

    // running
    webSocketClient.run();

    // executing some code
    LogicUser.authorize();
};
